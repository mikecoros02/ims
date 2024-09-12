<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriberResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'phoneNumber' => $this->phoneNumber,
            'username' => $this->username,
            'password' => $this->password,
            'domain' => $this->domain,
            'status' => $this->status,
            'features' => $this->features,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
