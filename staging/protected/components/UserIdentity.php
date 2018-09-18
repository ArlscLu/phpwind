<?php
/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity {

    public $_id;
    public $email;
    
    public function __construct($username,$password)
    {   
            $this->email=$username; 
            $this->username=$username;
            $this->password=$password;
    }

    /**
     * Authenticates a user.
     * @return boolean whether authentication succeeds.
     */
    public function authenticate() {
        $aUserData = array();
        $user = User::model()->find('LOWER(username)=?', array(strtolower($this->username)));
        if ($user === null)
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        else if (!$user->validatePassword($this->password))
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
        else {
            $this->_id = $user->id;
            $this->username = $user->username;
            $aUserData['username'] = $user->username;
            $aUserData['roleType'] = $user->roleType;
            $this->errorCode = self::ERROR_NONE;
            $this->setState('aUserData', $aUserData);
        }
        return $this->errorCode == self::ERROR_NONE;
    }

    

    /**
     * @return integer the ID of the user record
     */
    public function getId() {
        return $this->_id;
    }

}