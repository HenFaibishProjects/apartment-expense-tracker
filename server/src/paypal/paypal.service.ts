import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from '../auth/auth.service';
import { SubscriptionPlan } from './SubscriptionPlan';

@Injectable()
export class PaypalService {
  constructor(private readonly authService: AuthService) {}
  private clientId = process.env.PAYPAL_CLIENT_ID;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  private frontendBaseUrl = process.env.FRONTEND_BASE_URL;


  private baseUrl = 'https://api-m.sandbox.paypal.com'; // use 'api-m.paypal.com' in production

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    const response = await axios.post(`${this.baseUrl}/v1/oauth2/token`, 'grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  }

  public async createOrder(amount: number, userId: number): Promise<string> {
    const accessToken = await this.getAccessToken();
    const response = await axios.post(`${this.baseUrl}/v2/checkout/orders`, {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2),
          },
          custom_id: userId.toString()

        },
      ],
      application_context: {
        return_url: `${this.frontendBaseUrl}/success`,
        cancel_url: `${this.frontendBaseUrl}/cancel`,
      },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // return approval URL to redirect user
    return response.data.links.find((link: any) => link.rel === 'approve').href;
  }

  public async captureOrder(orderId: string) {
    const accessToken = await this.getAccessToken();
    const response = await axios.post(
      `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  public getEnvUrl()  {
    return this.frontendBaseUrl;
  }

  updateUsePlan(userId: number) {
    this.authService.updateUserPlan(userId, SubscriptionPlan.PRO)
      .then(r => console.log(`${r.email} updated plan to PRO`))
      .catch(err => console.error('Failed to update user plan:', err));
  }
}
