<?php if (strtolower($this->cookieLangType) == 'english') { ?><h1>Contact us</h1> <?php } ?> 
<?php if (strtolower($this->cookieLangType) == 'chinese') { ?><h1>联系我们</h1> <?php } ?> 
<div class="form-container">
    <div class="form-left-section">
        <?php if (strtolower($this->cookieLangType) == 'english') { ?> <h2>OLMA  Services</h2><?php } ?> 
        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> <h2>奥尔马客服服务</h2> <?php } ?> 
        <?php
        if (!empty($getContent)) {
            ?>

            <?php echo $getContent['content']; ?>

        <?php } ?>
    </div>
    <div class ="success" id ="success"></div>
    <div class="form-right-section">
        <?php if (strtolower($this->cookieLangType) == 'english') { ?>
            <form id="contact-form">
                <p>The authorized OLMA distribution partners will be pleased to provide a highly personal service; or contact us directly for more information.</p>
                <div class="contact-row">
                    <input type ="text" name="name" id ="name" placeholder="*Name" />
                    <div id="errorname" class="errormsg"></div>
                </div>
                <div class="contact-row">
                    <input type ="text" name="contactnumber" id ="contactnumber" placeholder="*Phone" />
                    <div id="errorcontactnumber" class="errormsg"></div>
                </div>
                <div class="contact-row">	
                    <input type ="text" name="email" id ="email" placeholder="*Email Address" />
                    <div id="erroremail" class="errormsg"></div>
                </div>
                <div class="contact-row">
                    <textarea rows="4" cols="50" name="message" id ="message" placeholder="*Message"></textarea>
                    <div id="errormessage" class="errormsg"></div>
                </div>
                <div class="contact-row">
                    <div class="squaredFour">
                        <input type="checkbox"  name="check" id="squaredFour" value="None">                   
                        <label for="squaredFour"></label><span>I would like to receive information on OLMA news and event.</span>
                    </div>
                    <div id="errors" class="errormsg"></div>
                </div>
                <input type="button" class="brown-btn" onclick="return formValidation()" value="Submit" />
            </form>
        <?php } ?>
        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?>

            <form id="contact-form">
                <p>欢迎您前往附近的奥尔马品牌店铺或维修中心，或者随时与我们联系了解更多相关信息。<br></p>
                <div class="contact-row">
                    <input type ="text" name="name" id ="name" placeholder="*姓名" />
                    <div id="errorname" class="errormsg"></div>
                </div>
                <div class="contact-row">
                    <input type ="text" name="contactnumber" id ="contactnumber" placeholder="*联系电话" />
                    <div id="errorcontactnumber" class="errormsg"></div>
                </div>
                <div class="contact-row">	
                    <input type ="text" name="email" id ="email" placeholder="*邮箱" />
                    <div id="erroremail" class="errormsg"></div>
                </div>
                <div class="contact-row">
                    <textarea rows="4" cols="50" name="message" id ="message" placeholder="*请留言"></textarea>
                    <div id="errormessage" class="errormsg"></div>
                </div>
                <div class="contact-row">
                    <div class="squaredFour">
                        <input type="checkbox"  name="check" id="squaredFour" value="None">                   
                        <label for="squaredFour"></label><span>同意接收奥尔马品牌发送的电子邮件更新及其他信息</span>
                    </div>
                    <div id="errors" class="errormsg"></div>
                </div>
                <input type="button" class="brown-btn" onclick="return formValidationChinese()" value="提交" />
            </form>

        <?php } ?>
        <div class="clr"></div>
    </div>
    <div class="clr"></div>

</div>

<script>
    function formValidation()
    {
        var name = $("#name").val();
        var contactnumber = $("#contactnumber").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var error = false;
        var mobile =contactnumber.toString().length; 
        var chk = $('#squaredFour').is(':checked');
//         var phoneno = /^\+?([0-9]{2})\)?[-,() ]?([0-9]{4})[-,() ]?([0-9]{4})$/; 
         var phoneno =  /^\(?([0-9]{3})\)?[- . , () ]?([0-9]{3})[- . , () ]?([0-9]{4})$/; 
         var letters = /^[a-zA-Z\s]+$/;
         
        if (chk==true) {
            $('#errors').html('');
        }
        else {
            if(name != '' && contactnumber != '' && email!=''  && chk == false){
                error = true;
                $('#errors').html('Please check terms & conditions.');
            }
            
                
        } 
        if(name=='')
        {
            $('#errorname').html('Please enter name');
            error = true;
        }
        else {
            $('#errorname').html('');
        }
        if(contactnumber=='')
        {
            $('#errorcontactnumber').html('Please enter mobile number');
            error = true;
        }
       
          else if(/[a-zA-Z]/.test(contactnumber))
        {
            $('#errorcontactnumber').html('Please enter valid mobile number');
            error = true;
           
        }
        else {
            $('#errorcontactnumber').html('');
        }
       
        if(email=='')
           
        {
            $('#erroremail').html('Please enter email');
            error = true;
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        {  
            $('#erroremail').html('Please enter valid email');
            error = true;
        }
        else {
            $('#erroremail').html('');
        }
        if(message=='')
        {
            $('#errormessage').html('Please enter message');
            error = true;
        }
        else {
            $('#errormessage').html('');
        } if (error == false) {
            var $form = $('#contact-form');
            var formData = new FormData($form[0]);
            formData.append('ajax', $form.prop('id'))
            $.ajax({
                type: 'POST',
                url: '<?php echo Yii::app()->createAbsoluteUrl("home/contactus"); ?>',
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    $('#success').html('<span>Your message is submitted successfully. We will shortly contact you!</span>');
                    $('#success span').delay(5000).fadeOut('slow');
                    $('#contact-form')[0].reset();
                },
                error: function(data) {
                    alert("Error occured.please try again");
                    return false;
                }

            });
        }
        else {
            return false;
        }
    }
    function formValidationChinese()
    {
        var name = $("#name").val();
        var contactnumber = $("#contactnumber").val(); 
        var email = $("#email").val();
        var message = $("#message").val();
        var error = false;
        var mobile =contactnumber.toString().length; 
        var chk = $('#squaredFour').is(':checked');
//        var phoneno =  /^\(?([0-9]{3})\)?[- . , () ]?([0-9]{3})[- . , () ]?([0-9]{4})$/; 
        var letters = /^[A-Za-z]+$/;  
   
  
        if (chk==true) {
            $('#errors').html('');
        }
        else {
            if(name != '' && contactnumber != '' && email!=''  && chk == false){
                error = true;
                $('#errors').html('同意接收电子报');
            }
                
        } 
        if(name=='')
        {
            $('#errorname').html('请输入名称');
            error = true;
        }
        else {
            $('#errorname').html('');
        }
        if(contactnumber=='')
        { 
            $('#errorcontactnumber').html('请输入手机号码');
            error = true;
        }
        
        
        else if(/[a-zA-Z]/.test(contactnumber))
        {
            $('#errorcontactnumber').html('移动号码应该只是数字， +， - ， （，） ，符号');
            error = true;
        }
        else {
            $('#errorcontactnumber').html('');
        }
        if(email=='')
           
        {
            $('#erroremail').html('请输入电子邮件');
            error = true;
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        {  
            $('#erroremail').html('请输入有效的电子邮件');
            error = true;
        }
        else {
            $('#erroremail').html('');
        }
        if(message=='')
        {
            $('#errormessage').html('请填写留言');
            error = true;
        }
        else {
            $('#errormessage').html('');
        } if (error == false) {
            var $form = $('#contact-form');
            var formData = new FormData($form[0]);
            formData.append('ajax', $form.prop('id'))
            $.ajax({
                type: 'POST',
                url: '<?php echo Yii::app()->createAbsoluteUrl("home/contactus"); ?>',
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    $('#success').html('<p>你的消息提交成功。我们会尽快与您联系！</p>');
//                    $('.success span').delay(5000).fadeOut('slow');
//                    $('#contact-form')[0].reset();
                },
                error: function(data) { 
                    alert("Error occured.please try again");
                    return false;
                }

            });
        }
        else {
            return false;
        }
    }
</script>
<style>.errormsg{ color:#f00; clear: both; text-align: left; margin-top:3px !important;}
    #addOption{ cursor: pointer; color: #3b85b9; font-weight: bold !important; font-size: 16px; }
</style>