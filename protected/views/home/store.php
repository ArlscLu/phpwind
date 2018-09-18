<?php if (strtolower($this->cookieLangType) == 'english') { ?><h1>DISTRIBUTORS</h1> <?php } ?> 
<?php if (strtolower($this->cookieLangType) == 'chinese') { ?><h1>经销网店</h1> <?php } ?> 
<div class="stores">
    <?php if (strtolower($this->cookieLangType) == 'english') { ?><h2>Address Locator</h2> <?php } ?> 
    <?php if (strtolower($this->cookieLangType) == 'chinese') { ?><h2>寻找品牌店铺</h2> <?php } ?> 
    <ul class="dropdown">
        <li>
            <select class="sub_menu" id="test" onchange="return getCityNAme(this.value);" >
                <?php if (strtolower($this->cookieLangType) == 'english') { ?>  <option> <a href="#">Choose a Store</a> </option><?php } ?>
                <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> <option> <a href="#">请选择城市</a></option><?php } ?>
                <?php
                foreach ($getCityList as $value) {
                    if ($cityHeader == $value['cityName']) {
                        $selected = 'selected=selected';
                    } else {
                        $selected = '';
                    }
                    ?>
                    <option <?php echo $selected; ?>><a class="location" href="#"><?php echo $value['cityName'] ?></a></option>
                <?php } ?>
            </select>
        </li>
    </ul><div id="loader_image2"></div>
</div>       

<div class="store_search_result" id ="storesearch">

    <h3><?php echo $cityHeader; ?></h3>
    <?php
    if (isset($getDetail) && !empty($getDetail)) {
        foreach ($getDetail as $value) {
            ?>

            <div class="results">
                <?php echo $value['address'] ?>  
                <div class="location_image"><img src="../images/location.png" height="34" width="24" /></div>
            </div>
            <?php
        }
    }
    ?>


</div>

<div class="clr"></div>
<script type="text/javascript">
 $('#loader_image2').hide();
 function getCityNAme(val) { 
        if(val!='Choose a Store' && val!='请选择城市')
        {
            var myData = "cityVal="+val;
            $.ajax({
                type: 'POST',
                url: '<?php echo Yii::app()->createAbsoluteUrl("home/store"); ?>',
                data: myData,
                beforeSend: function() {
                    $('#loader_image2').show();
                    
                },
             
                success: function(data) {
                    $.when($('#loader_image2').fadeOut(200))
                    .done(function() {
                        $('#storesearch').fadeIn();
                    });
                    $('.store_search_result').html(data);
                    //                window.location.reload();
                },
                error: function(data) { // if error occured
                    $('#loader_image2').hide();
                    alert("Error occured.please try again");
                    return false;
                }

            });  
        }
        else if(val =='请选择城市') {
            alert('请选择其他城市！');
        }
          else if(val =='Choose a Store') {
            alert('Please select another Store!');
        }
    }
   
 
</script>

<style>
    #loader_image2{background: url(../images/storeloader.gif) no-repeat center center; height: 150px}
</style>