<?php
$this->pageTitle = Yii::app()->name . ' - Login';
$this->breadcrumbs = array(
    'Login',
);
?>

<div class="form">
    <div class="login_head"><img class="login_icon" src="<?php echo Yii::app()->request->baseUrl; ?>/images/login_icon.png"> LogIn </div>
    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'login-form',
        'enableAjaxValidation' => true,
            ));
    ?>

<!--    <p class="note">Fields with <span class="required">*</span> are required.</p>-->

    <div class="row">
        <?php //echo $form->labelEx($model, 'username'); ?>
<?php echo $form->textField($model, 'username',array("placeholder"=>"Username")); ?>
<?php echo $form->error($model, 'username'); ?>
    </div>

    <div class="row">
        <?php //ektaekta
        //echo $form->labelEx($model, 'password'); ?>
<?php echo $form->passwordField($model, 'password',array("placeholder"=>"Password")); ?>
<?php echo $form->error($model, 'password'); ?>

    </div>

    <div class="row rememberMe">
        <?php echo $form->checkBox($model, 'rememberMe'); ?>
<?php echo $form->label($model, 'rememberMe'); ?>
<?php echo $form->error($model, 'rememberMe'); ?>
    </div>

    <div class="row submit">
    <?php echo CHtml::submitButton('Login'); ?>
    </div>

<?php $this->endWidget(); ?>
</div><!-- form -->
<style>
    .login_head {
        font: 25px "Open Sans",Arial,Helvetica,sans-serif;
        padding: 15px;
        text-align: center;
        text-transform: uppercase;
		background:#fff;
    }
	#login_form{
		background: #e3e3e3; text-align: center; padding: 20px; height: 100%;
	}
	.rememberMe{margin:15px 0  !important;}
    .form{
        background: none repeat scroll 0 0 #E3E3E3;
     
        text-align: center;
        border: 1px solid #D9D9D9;
        border-radius: 10px;
       
        margin: 100px auto;
        max-width: 450px;
      
        
        width: 100%;
    }    

    .row input[ type=text ]{
        background: #fff;
        height: 40px;
        border: 1px solid #b1b1b1;
        border-radius: 5px;
        display: inline-block;
        margin-top: 15px;
        width: 60%;
        color: #666;
        text-align: center;
        font-size: 15px;
		float:none;
        padding: 4px;

    }
    .errorMessage{ color:red; margin-left:0 !important; width: 100%; }
    .row input[ type=submit ]{
               background: none repeat scroll 0 0 #292929;
            border: 1px solid #B1B1B1;
            border-radius: 10px;
            color: #FFFFFF;
            display: inline-block;
            font-size: 15px;
            height: 40px;
            margin-bottom: 10px;
            text-transform: uppercase;
            width: 144px;
            float:none;
	}
    .row input[ type=password ]{
        background: #fff;
        height: 40px;
        border: 1px solid #b1b1b1;
        border-radius: 5px;
        display: inline-block;
        margin-top: 15px;
        width: 60%;
        color: #666;
        text-align: center;
        font-size: 15px;
		float:none;
        padding: 4px;

    }
	#login-form .row{ text-align:center; }
	#login-form .row input[ type=checkbox ]{
		width:auto; float:none; display:inline-block; vertical-align:middle; padding:0; height:auto; margin:0; margin-right:5px;
	}
	#login-form .row label{ width:auto; float:none; display:inline-block; padding:0; line-height:normal; height:auto; margin:0; }
	.form p.note{ padding:10px 0 0; margin:0; }
</style>