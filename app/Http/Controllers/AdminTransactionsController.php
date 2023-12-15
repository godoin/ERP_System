<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminTransactionRequest;
use App\Http\Requests\UpdateAdminTransactionRequest;
use App\Models\AdminTransactions;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTransactionsController extends Controller
{
    public function index() {

        return Inertia::render("Admin/Transactions", [
            'transactions' => AdminTransactions::get(),
        ]);
    }

    public function store(StoreAdminTransactionRequest $request) {

        $validated = $request->validated();

        AdminTransactions::create($validated);

        return back();
    }

    public function update(UpdateAdminTransactionRequest $request, AdminTransactions $admin_transactions)
    {
        $validated = $request->validated();

        $admin_transactions->update($validated);

        return back();
    }
    public function destroy(AdminTransactions $admin_transactions)
    {
        $admin_transactions->delete();
        return back();
    }
}
