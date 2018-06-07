<?php

class ControllerChild extends Controller {

    public $cookieLangType;
    public $langType;

    public function init() {
        parent::init();
        if (isset($_GET['preview'])) {
            $previewFlag = true;
            Yii::app()->request->cookies['previewAdmin'] = new CHttpCookie('previewAdmin', $previewFlag);
        }
        if (isset(Yii::app()->request->cookies['lang_type']->value)) {
            $this->cookieLangType = Yii::app()->request->cookies['lang_type']->value;
        } else {
            $this->cookieLangType = 'Chinese';
        }
        if (strtolower($this->cookieLangType) == 'english') {
            $this->langType = 'en';
        } else if (strtolower($this->cookieLangType) == 'chinese') {
            $this->langType = 'cn';
        }
    }

}
