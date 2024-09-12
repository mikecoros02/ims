<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Subscriber;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Subscriber::factory()->create([
            'phoneNumber' => '18675181010',
            'username' => '16045906403',
            'password' => 'p@ssw0rd!',
            'domain' => 'ims.mnc660.mcc302.3gppnetwork.org',
            'status' => 'ACTIVE',
            'features' => '{"callForwardNoReply":{"provisioned":true,"destination":"tel:+18675182800"}}',
        ]);

        Subscriber::factory(9)->create();
    }
}
