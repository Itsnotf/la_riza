<?php

namespace App\Repositories;

use App\Models\Kasus;
use App\Models\Pasal;

class PasalRepository implements PasalRepositoryInterface
{
        public function all()
        {
            return Pasal::get();
        }

        public function create(array $data)
        {
            return Pasal::create($data);
        }

        public function update($id , array $data)
        {
            $pasal = $this->find($id);
            $pasal->update($data);

            return $pasal;
        }

        public function find($id)
        {
            return Pasal::findOrfail($id);
        }

        public function delete($id)
        {
            return Pasal::destroy($id);
        }
}
