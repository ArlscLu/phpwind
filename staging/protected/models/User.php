<?php

class User extends CActiveRecord {
    /**
     * The followings are the available columns in table 'tbl_user':
     * @var integer $id
     * @var string $username
     * @var string $password
     * @var string $email
     * @var string $profile
     */

    /**
     * Returns the static model of the specified AR class.
     * @return CActiveRecord the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{user}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('username, password, email', 'required'),
            array('username, password, email', 'length', 'max' => 128),
            array('profile', 'safe'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
                //	'posts' => array(self::HAS_MANY, 'Post', 'author_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'Id',
            'username' => 'Username',
            'password' => 'Password',
            'email' => 'Email',
            'profile' => 'Profile',
        );
    }

    /**
     * Checks if the given password is correct.
     * @param string the password to be validated
     * @return boolean whether the password is valid
     */
//	public function validatePassword($password)
//	{
//		return CPasswordHelper::verifyPassword($password,$this->password);
//	}
    public function validatePassword($password) {
      
        if (md5($password) == $this->password) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Generates the password hash.
     * @param string password
     * @return string hash
     */
    public function hashPassword($password) {
        return CPasswordHelper::hashPassword($password);
    }
      public function checkPasswordExist($password,$id) {

        $group = User::model()->find("id='$id' && password='$password'");
        if (count($group) > 0) {
            return 1;
        } else {
            return 0;
        }
    }
    
            public function checkPassword($password,$id) {
               // echo $password; echo $id; die;                // echo $password; echo $id; die; 

            $password  = md5($password);
            $group = User::model()->find("id='$id' && password='$password'");
            if (count($group) > 0) {
            return 1 ;
            } else {
            return 0;
            }
}

}
