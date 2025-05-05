<?php

namespace App\Repositories;

use App\Models\Saksi;
use App\Services\SaksiService;

class SaksiRepository implements SaksiRepositoryInterface
{
   public function all()
   {
      return Saksi::all();
   }

   public function create(array $data)
   {
     return Saksi::create($data);
   }

   public function find($id)
   {
    return Saksi::find($id);
   }

   public function update($id, array $data)
   {
     $saksi = $this->find($id);
     $saksi->update($data);

     return $saksi;
   }

   public function delete($id)
   {
     Saksi::destroy($id);
   }
}
