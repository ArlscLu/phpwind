<div class="info">
    <?php
    foreach (Yii::app()->user->getFlashes() as $key => $message) {
        echo '<div class="flash-' . $key . '">' . base64_decode($message) . "</div>\n";
    }
    ?>
</div>
<?php
Yii::app()->clientScript->registerScript(
        'myHideEffect', '$(".info").animate({opacity: 1.0}, 3000).fadeOut("slow");', CClientScript::POS_READY
);
?>
<div class="form">
    <div class="login_head"><h1>Change Password </h1><br>
<?php $path = Yii::app()->createUrl('setting/changepassword'); ?>
    <form name="user-form" method="post" action="<?php echo $path ?>" class="col-lg-9">
        <p class="row"> <?php echo '<label class="required" for="Old Password">Current Password <font color="red">*</font></label>'; ?> <?php echo '<input id="old_password" name="old_password" type="password" autocomplete="off" size="20">'; ?> </p>
        <p class="row"> <?php echo '<label class="required" for="Password">New Password <font color="red">*</font></label>'; ?> <?php echo '<input id="password" name="password" type="password" size="20">'; ?> </p>
        <p class="row"> <?php echo '<label class="required" for="Confirm Password">Confirm Password <font color="red">*</font></label>'; ?> <?php echo '<input id="conf_password" name="conf_password" type="password" size="20">'; ?> </p>
        <p class="btn-container row">
            <label>&nbsp;</label>
<?php echo CHtml::submitButton('Change', array('class' => 'sign-btn1')); ?> </p>
    </form>
</div>

