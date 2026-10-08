import nodemailer from 'nodemailer';
import { sheets, auth } from '@googleapis/sheets';

export async function POST(req) {
  try {
    const { email, contact, attending, guests, numGuests } = await req.json();

    if (!guests || guests.length === 0 || !email || !contact || attending === null) {
      return new Response(JSON.stringify({ error: 'Required fields missing' }), { status: 400 });
    }

    const mainGuestOrCouple = guests[0] ? `${guests[0].title} ${guests[0].fullName}` : 'N/A';
    const additionalGuests = guests.length > 1 ? guests.slice(1).map(g => `${g.title} ${g.fullName}`).join(', ') : 'None';
    const allGuestsStr = guests.map(g => `${g.title} ${g.fullName}`).join(', ');

    // Use Gmail service if standard gmail passwords are provided
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      subject: `New RSVP Submission from ${mainGuestOrCouple}`,
      html: `
        <h2>New RSVP Submission</h2>
        <p><strong>Main Guest/Couple:</strong> ${mainGuestOrCouple}</p>
        <p><strong>Additional Guests:</strong> ${additionalGuests}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${contact}</p>
        <p><strong>Attending:</strong> ${attending ? 'Yes' : 'No'}</p>
        <p><strong>Total Number of Guests:</strong> ${attending ? (numGuests || guests.length) : 0}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

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
          range: 'Sheet1!A:H',
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
