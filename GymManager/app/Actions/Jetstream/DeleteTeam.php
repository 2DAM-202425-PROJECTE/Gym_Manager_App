<?php

namespace App\Actions\Jetstream;

use App\Models\Team;
use Laravel\Jetstream\Contracts\DeletesTeams;

class DeleteTeam implements DeletesTeams
{
    /**
     * Suprimeix l'equip donat.
     */
    public function delete(Team $team): void
    {
        $team->purge();
    }
}
