<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use App\Http\Resources\SubscriberResource;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return SubscriberResource::collection(
            Subscriber::query()->orderBy('created_at', 'asc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($phoneNumber)
    {
        $result = Subscriber::where('phoneNumber', $phoneNumber)->first();
        return new SubscriberResource($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $phoneNumber)
    {
        $validatedData = $request->validate([
            'phoneNumber' => 'required|numeric|digits:11',
            'username' => 'required|numeric|digits:11',
            'password' => 'required|string|min:8',
            'domain' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'features' => 'required|string'
        ]);

        $result = Subscriber::updateOrCreate(
            ['phoneNumber' => $phoneNumber],
            [
                'username' => $validatedData['username'],
                'password' => $validatedData['password'],
                'domain' => $validatedData['domain'],
                'status' => $validatedData['status'],
                'features' => $validatedData['features']
            ]
        );

        return response(new SubscriberResource($result), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($phoneNumber)
    {
        $result = Subscriber::where('phoneNumber', $phoneNumber)->first();

        if ($result) {
            $result->delete();
            return response("Subscriber deleted", 204);
        }
    }
}
