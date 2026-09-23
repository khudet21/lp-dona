<?php

namespace App\Filament\Pages\Auth;

use Filament\Schemas\Schema;
use Filament\Auth\Pages\Login as BaseLogin;

class Login extends BaseLogin
{
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getRememberFormComponent()->default(true),
            ])
            ->statePath('data');
    }
}
