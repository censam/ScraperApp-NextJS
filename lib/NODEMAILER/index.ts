`use server`;
import { EmailContent, EmailProductInfo, NotificationType } from '@/types';
import nodemailer from 'nodemailer';

export const Notification = {
    WELCOME: 'WELCOME',
    CHANGE_OF_STOCK: 'CHANGE OF STOCK',
    LOWEST_PRICE: 'LOWEST PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET'
}
export const THRESHOLD_MET = 40;
export const THRESHOLD_PERCENTAGE = 20;

const transporter = nodemailer.createTransport({
    pool: true,
    service: 'hotmail',
    port: 2525,
    auth: {
        user: process.env.HOTMAIL_USER,
        pass: process.env.HOTMAIL_PASSWORD,
    },
    maxConnections: 1

});

export const sendEmail = async (emailContent: any, sendTo: string[]) => {
    console.log('emailContent-----------------', emailContent)


    const mailOptions = {
        from: process.env.HOTMAIL_USER,
        to: sendTo,
        html: emailContent.body,
        subject: emailContent.subject,
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {

        if (error) {
            console.log('Work error', error);
        }

        console.log('Mail Sent', info);

    });
}

export async function generateEmailBody(product: any, type: NotificationType) {
    const shortenedTitle = product.title.length > 40 ? `${product.title.substring(0, 40)}...` : `${product.title}`;

    let subject = ``;
    let body = ``;


    switch (type) {
        case Notification.WELCOME:
            subject = `Welcome to Price Tracking for ${shortenedTitle}`;
            body = `<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                                <tr>
                                    <td style="background-color: #f1846a; color: #fff; padding: 20px; text-align: center;">
                                        <h1>Welcome to Pricer</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <p>Dear [User's Name],</p>
                                        <p>Thank you for joining Pricer, your go-to tool for tracking product prices and deals. We're excited to have you as a part of our community.</p>
                                        <p>With Pricer, you can:</p>
                                        <ul>
                                            <li>Track prices of your favorite products from various online retailers.</li>
                                            <li>Receive price change notifications and never miss a great deal.</li>
                                            <li>Compare prices across different e-commerce websites to find the best offers.</li>
                                        </ul>
                                        <p>Get started now by adding your first product to track. Simply paste the product URL, and we'll take care of the rest!</p>
                                        <p>If you have any questions or need assistance, our support team is here to help. Feel free to reach out at support@pricer.com.</p>
                                        <p>Happy tracking!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                                        <p>&copy; 2023 Pricer. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>`;

            break;

        case Notification.CHANGE_OF_STOCK:
            subject = `Welcome to Price Tracking for ${shortenedTitle}`;
            body = `<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                                <tr>
                                    <td style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
                                        <h1>Pricer - Stock Status Change</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <p>Dear [User's Name],</p>
                                        <p>We are writing to inform you about a change in the stock status of a product you've been tracking with Pricer.</p>
                                        <p>Product Details:</p>
                                        <ul>
                                            <li>Product Name: ${shortenedTitle}</li>
                                            <li>Product URL: ${product.url}</li>
                                        </ul>
                                        <p>The stock status has changed from ${product.isOutOfStock} to [New Stock Status].</p>
                                        <p>This update ensures you stay informed about the availability of the product you're interested in.</p>
                                        <p>If you have any questions or need further assistance, please don't hesitate to contact our support team at support@pricer.com.</p>
                                        <p>Thank you for using Pricer!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                                        <p>&copy; 2023 Pricer. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
`
            break;

        case Notification.LOWEST_PRICE:
            subject = `Welcome to Price Tracking for ${shortenedTitle}`;
            body = `    <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td style="background-color: #f2f2f2; padding: 20px;">
                    <table align="center" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e4e4e4;">
                        <tr>
                            <td style="padding: 20px;">
                                <h1 style="color: #333;">Lowest Price Alert!</h1>
                                <p style="font-size: 16px; color: #666;">Great news! The price for the product you've been watching has dropped to its lowest point.</p>
                                <p style="font-size: 16px; color: #666;">Here are the details:</p>
                                <ul>
                                    <li><strong>Product Name:</strong> ${shortenedTitle}</li>
                                    <li><strong>Previous Price:</strong> $99.99</li>
                                    <li><strong>New Price:</strong> $79.99</li>
                                    <li><strong>Store:</strong> Store Name</li>
                                    <li><strong>Link to Product:</strong> <a href="${product.url}">${product.url}</a></li>
                                </ul>
                                <p style="font-size: 16px; color: #666;">Hurry and take advantage of this amazing deal before it's gone!</p>
                                <p style="font-size: 16px; color: #666;">Happy shopping!</p>
                                <p style="font-size: 16px; color: #666;">Best regards,<br>Your Price Alert Team</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`
            break;


        case Notification.THRESHOLD_MET:
            subject = `Welcome to Price Tracking for ${shortenedTitle}`;
            body = ` <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td style="background-color: #f2f2f2; padding: 20px;">
                    <table align="center" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e4e4e4;">
                        <tr>
                            <td style="padding: 20px;">
                                <h1 style="color: #333;">Threshold Met Alert</h1>
                                <p style="font-size: 16px; color: #666;">Congratulations!</p>
                                <p style="font-size: 16px; color: #666;">We are excited to inform you that the specified threshold has been met or exceeded. This is a significant milestone, and we wanted to share this accomplishment with you.</p>
                                <p style="font-size: 16px; color: #666;">Here are the details:</p>
                                <ul>
                                    <li><strong>Threshold Name:</strong> Threshold Name Here</li>
                                    <li><strong>Threshold Value:</strong> ${THRESHOLD_PERCENTAGE}%</li>
                                    <li><strong>Current Value:</strong> 110%</li>
                                </ul>
                                <p style="font-size: 16px; color: #666;">Thank you for your contribution and dedication to this goal. Your efforts have made this achievement possible.</p>
                                <p style="font-size: 16px; color: #666;">We look forward to reaching new milestones together in the future!</p>
                                <p style="font-size: 16px; color: #666;">Best regards,<br>Your Threshold Alert Team</p>
                            </td>
                        </tr>
                    </table>`
            break;

        default:
            break;
    }
    return { subject, body };
}