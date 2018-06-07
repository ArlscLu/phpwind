<?php

class AdminController extends Controller
{
	public $layout='admin_layout';

	/**
	 * Declares class-based actions.
	 */
        
        
       
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array('class'=>'CViewAction',
			),
		);
	}
      public function actionIndex()
        {
            $this->redirect(array('login'));
        }
	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}

	

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{   if(!isset(Yii::app()->user->id))
                 {
		if (!defined('CRYPT_BLOWFISH')||!CRYPT_BLOWFISH)
			throw new CHttpException(500,"This application requires that PHP was compiled with Blowfish support for crypt().");

		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				// $this->redirect(array('player/admin'));
                            $this->redirect(array('banner/admin'));
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}else
         $this->redirect(array('banner/admin'));
        }

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl.Yii::app()->params['adminModule']);
	}
       
}
