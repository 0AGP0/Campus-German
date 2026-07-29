<?php
/**
 * Örnek: data/booking-pay-proxy.config.php olarak kopyalayın.
 *
 * Embedded Checkout için:
 * - Portal/Make: ui_mode = embedded_page (veya embedded), yanıtta clientSecret
 * - Bu dosyada stripe_publishable_key = pk_live_... veya pk_test_...
 */
return [
    'make_webhook_url' => 'https://hook.eu2.make.com/40s1h4a3wra21aszpa9y9erfsfooso47',
    // Stripe Dashboard → Developers → API keys → Publishable key
    'stripe_publishable_key' => 'pk_live_51S5sQA6HoTlUSKkYQMC5lnHhO1CNhQ8St3JwrqNIwPXw7ESJj4Vrrubkl4nm8zsxi0d0u90w6YGpZ7ircj7eszpU00K6jG1GqS',
];
