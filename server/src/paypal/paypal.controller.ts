import { BadRequestException, Controller, Post, Query, Req, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { Request, Response } from 'express';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}


  @Post('create-order')
  async createOrder(@Req() req: Request, @Res() res: Response): Promise<void> {
    const userId = req.query.userId;
    if (!userId) {
      throw new BadRequestException('Missing userId');
    }
  const approvalUrl = await this.paypalService.createOrder(10, +userId); // $10 hardcoded, for now
  res.redirect(approvalUrl);
  }

  // Step 2 – PayPal redirects user back to your app (return_url), you capture the order
  @Post('capture-order')
  async captureOrder(@Query('token') token: string, @Res() res: Response) {
    const captureResult = await this.paypalService.captureOrder(token);
    console.log('✅ Payment Captured:', captureResult);
    const frontUrl = this.paypalService.getEnvUrl();
      res.redirect( `${frontUrl}/success`);
  }
  @Post('webhook')
  handleWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('✅ Webhook received from PayPal:', req.body);

    const event = req.body;
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const userId = Number(event.resource?.custom_id);

      if (!userId || isNaN(userId)) {
        console.warn('❌ custom_id (userId) missing or invalid in webhook payload');
        return res.status(400).send('Missing user ID');
      }

      const payerEmail = event.resource.payer?.email_address;
      const transactionId = event.resource.id;

      this.paypalService.updateUsePlan(userId);
      console.log(`✅ Payment completed for ${payerEmail} (TX: ${transactionId})`);
    }

    return res.status(200).json({ received: true });
  }

}
