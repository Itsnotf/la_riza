<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pasal_terlanggar', function (Blueprint $table) {
            $table->foreignId('kasus_id')->constrained()->onDelete('cascade');
            $table->foreignId('pelaku_id')->constrained()->onDelete('cascade');
            $table->foreignId('pasal_id')->constrained()->onDelete('cascade');
            $table->primary(['kasus_id', 'pelaku_id', 'pasal_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasal_terlanggars');
    }
};
