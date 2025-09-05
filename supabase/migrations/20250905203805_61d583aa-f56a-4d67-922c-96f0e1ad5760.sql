-- Clear temporary site access codes
DELETE FROM site_access_codes WHERE encrypted_secret = 'temp_encrypted_secret' OR salt = 'temp_salt';