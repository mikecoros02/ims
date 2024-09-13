<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscriber>
 */
class SubscriberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $domain = 'ims.' . $this->faker->regexify('[a-z0-9]{6}') . '.' . $this->faker->regexify('[a-z0-9]{6}') . '.3gppnetwork.org';
        $callForwardNoReply = [
            "callForwardNoReply" => [
                "provisioned" => $this->faker->boolean,
                "destination" => 'tel:' . $this->faker->phoneNumber
            ]
        ];
        $callForwardNoReplyJSON = json_encode($callForwardNoReply);

        return [
            'phoneNumber' => $this->faker->numerify('1##########'),
            'username' => $this->faker->numerify('###########'),
            'password' => 'p@ssw0rd!',
            'domain' => $domain,
            'status' => $this->faker->randomElement(['ACTIVE', 'INACTIVE']),
            'features' => $callForwardNoReplyJSON
        ];
    }
}
