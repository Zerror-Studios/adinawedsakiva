import { sheets, auth } from '@googleapis/sheets';

export async function POST(req) {
  try {
    const { email, contact, attending, guests, numGuests, side, relation, customRelation } = await req.json();

    console.log('Received RSVP Data:', { email, contact, attending, guests, numGuests, side, relation, customRelation });

    if (!guests || guests.length === 0 || !email || !contact || attending === null || !side || !relation) {
      return new Response(JSON.stringify({ error: 'Required fields missing' }), { status: 400 });
    }

    if (relation === 'Others' && (!customRelation || customRelation.trim() === '')) {
      return new Response(JSON.stringify({ error: 'Please specify your relation' }), { status: 400 });
    }

    const mainGuestOrCouple = guests[0] ? `${guests[0].title} ${guests[0].fullName}` : 'N/A';
    const additionalGuests = guests.length > 1 ? guests.slice(1).map(g => `${g.title} ${g.fullName}`).join(', ') : 'None';
    const allGuestsStr = guests.map(g => `${g.title} ${g.fullName}`).join(', ');

    // Google Sheets integration
    try {
      if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL && process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY && process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID) {
        const client = new auth.GoogleAuth({
          credentials: {
            client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
            private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheetsAPI = sheets({ version: 'v4', auth: client });

        await sheetsAPI.spreadsheets.values.append({
          spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
          range: 'Sheet1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[
              new Date().toLocaleString(),
              mainGuestOrCouple,
              additionalGuests,
              email,
              contact,
              attending ? 'Yes' : 'No',
              attending ? (numGuests || guests.length) : '0',
              side,
              relation === 'Others' ? customRelation : relation,
            ]],
          },
        });
      } else {
        console.warn('Google Sheets environment variables are missing.');
      }
    } catch (sheetError) {
      console.error('Google Sheets append error:', sheetError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('RSVP form error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
