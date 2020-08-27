$(document).ready(function() {
    var $checkboxWrapper = $('.checkbox-wrapper');
    var addIcon = '<i class="fas fa-plus fa-sm icon-style checkbox-icon-add"></i>';
    var checkIcon = '<i class="fas fa-check fa-sm icon-style checkbox-icon-check"></i>';
    var radioIcon = '<i class="fas fa-check fa-sm icon-style radiobox-icon exist" style = "color: #FFF !important"></i>';
    var checkBackground = 'item-box-check-background';
    var solidBlueBorder = '2px solid #1170DA';
    var transparentBorder = '2px solid transparent';
    var blueColorClass = 'blue-color';
    var displayNone = 'd-none';
    var $radioboxWrapper = $('.radiobox-wrapper');
    var $itemBoxContainer = $('.item-box-container');
    var $boxMainContainer = $('.box-main-container');
    var $itemRadioBoxContainer = $('.item-radio-box-container', $boxMainContainer);
    var $radioCircle = $('.circle', $radioboxWrapper);
    //STEPS
    var $prev = $('#prev');
    var $next = $('#next');
    var $stepsContainer = $('.steps-container');
    var $stepsContent = $('.steps-content');
    setcheckbox();
    setRadiobox();
    setSteps();

    function setcheckbox() {
        $itemBoxContainer.on('click', function() {
            const $checkContainer = $(this).find('.checkbox-wrapper');
            const $parentContainer = $checkContainer.parent();
            const $checkbox = $checkContainer.children().first('input');
            const icon = $checkContainer.find('i');
            if (!$checkbox.is(":checked")) {
                $checkbox.attr('checked', true);
                icon.remove();
                $checkContainer.append(checkIcon);
                $checkContainer.addClass(checkBackground);
                $parentContainer.css('border', solidBlueBorder);
                $parentContainer.find("span").addClass(blueColorClass)
            } else {
                icon.remove();
                $checkContainer.removeClass(checkBackground);
                $checkbox.attr('checked', false);
                $checkContainer.append(addIcon);
                $parentContainer.css('border', transparentBorder);
                $parentContainer.find("span").removeClass(blueColorClass)
            }
        })
    }

    function setRadiobox() {
        $itemRadioBoxContainer.on('click', function(e) {
            const $circle = $(this).find('.circle');
            const $wrapper = $(this).find('.radiobox-wrapper');
            const $innerCircle = $circle.children().first();
            $("input", $wrapper).prop("checked", true);
            $itemRadioBoxContainer.find("span").removeClass(blueColorClass);
            $(this).find("span").addClass(blueColorClass);
            $('.radiobox-icon', $radioboxWrapper).remove();
            $radioCircle.removeClass(checkBackground);
            $('.inner-circle', $radioboxWrapper).removeClass(displayNone);
            $innerCircle.addClass(displayNone);
            $circle.addClass(checkBackground);
            $circle.append(radioIcon);
        })
    }

    function setSteps() {
        $next.on('click', function() {
            var firstChild = $stepsContainer.find('.active:first');
            var existLine = firstChild.find('.line-wrapper');
            var done = firstChild.hasClass('done');
            var brother = firstChild.next();

            if (done === true) {
                return;
            }

            if (firstChild.length !== 0) {
                if (existLine.length != 0) {
                    firstChild.removeClass('active');
                } else {
                    firstChild.addClass('done');
                }

                firstChild.find('.text').removeClass('blue-color');
                firstChild.find('.text').removeClass('bold-700');
                firstChild.find("span").removeClass('gray-color');
                firstChild.find("span").addClass('green-color');
                firstChild.removeClass('dark-violet');
                firstChild.find('.circle').addClass('no-border');
                firstChild.find('.inner-circle').addClass('green-color');
                firstChild.find('.number').addClass('d-none');
                firstChild.find('.inner-circle').append(radioIcon);
                brother.find('.no-border').removeClass('no-border');
                brother.find('.dark-violet').removeClass('dark-violet');
                brother.find('.opacity-80').removeClass('opacity-80');
                brother.find("span").removeClass('gray-color');
                brother.addClass('active');
                brother.find('.text').addClass('blue-color');
                brother.find('.text').addClass('bold-700');
            } else {
                var children = $stepsContainer.find('.step-wrapper').first();
                children.addClass('active');
                children.find('.text').addClass('blue-color');
                children.find('.text').addClass('bold-700');
                children.find('.no-border').removeClass('no-border');
                children.find('.dark-violet').removeClass('dark-violet');
                children.find('.opacity-80').removeClass('opacity-80');
                children.find("span").removeClass('gray-color');
            }

            var firstActiveStepContent = $stepsContent.find('.active:first');
            var nextStep = firstActiveStepContent.next();

            if (firstActiveStepContent.length !== 0) {
                firstActiveStepContent.removeClass('active');
                firstActiveStepContent.addClass('d-none-custom');
                firstActiveStepContent.removeAttr("style");
                nextStep.addClass('active');
                nextStep.show('slow');

            } else {
                var firstActiveStepContent = $stepsContent.find('.step-content').first();
                firstActiveStepContent.addClass('active');
                firstActiveStepContent.show('slow');
            }
        })
    }


    //ABONEAZA-TE ACUM BUTTON
    setButton();

    function setButton() {
        var price = '.price';
        var $abonament = $("#abonament");
        var itemBoxContainer = '.item-box-container';
        var boxesIds = ["oJucarie", "douaJucarie"];
        var boxesValue = 0;
        var buttonValue = parseFloat($abonament.find('span:first').text());

        boxesIds.forEach(function(itemId) {
            var $input = $(`#${itemId}`);
            var $parent = $input.parents(itemBoxContainer);
            $parent.on('click', function() {
                var $price = $(this).find(price);
                var str = $price.text();
                var stringPrice = str.substring(1);
                var priceValue = parseFloat(stringPrice);
                if ($input.is(':checked')) {
                    boxesValue = boxesValue + priceValue;
                } else {
                    boxesValue = boxesValue - priceValue;
                }
                $abonament.find('span:first').text(buttonValue + boxesValue);
            })
        })
    }

    //VALIDATION 
    setInput();

    function setInput() {

        // $('#dateInput').datepicker({
        //     format: "mm/yy",
        //     startView: "months",
        //     minViewMode: "months",
        // });

        inputRestrictor.setInputOnlyWithDigits("cvv");
        inputRestrictor.setInputWithExactCharactersLength("cvv", 3);
        //
        inputRestrictor.setInputOnlyWithDigits("card");
        inputRestrictor.setInputWithExactCharactersLength("card", 16);
        inputRestrictor.putCharacterAfterNumberOfCharacters("card", " ", 4);
        //date
        inputRestrictor.setInputOnlyWithDigits("dateInput");
        inputRestrictor.setInputWithExactCharactersLength("dateInput", 5);
        inputRestrictor.putCharacterAfterNumberOfCharacters("dateInput", "/", 2);

        var inputsList = [{
                id: 'name',
                fieldLabel: 'Name',
                required: true,
                type: 'text',
                maxLength: '5',
                minLength: '3',
                allowedCharacters: 'Alpha',
                triggerType: 'change'
            },
            {
                id: 'card',
                fieldLabel: 'Card',
                charactersLength: 16,
                required: true,
                type: 'text',
                triggerType: 'change'
            },

            {
                id: 'cvv',
                fieldLabel: 'CVV',
                charactersLength: 3,
                required: true,
                type: 'text',
            },
            {
                id: 'dateInput',
                fieldLabel: 'Date',
                charactersLength: 5,
                required: true,
                type: 'text',
                triggerType: 'change'
            },
            {
                id: 'password',
                fieldLabel: 'Password',
                charactersLength: 3,
                type: 'text',
                allowedCharacters: 'AlphaNumeric',
                required: true,

            },
            {
                id: 'list',
                fieldLabel: 'List',
                type: 'dropdown',
                required: true
            },
            {
                id: 'list2',
                fieldLabel: 'List 2',
                type: 'dropdown',
                required: true
            },
            {
                id: 'email',
                fieldLabel: 'Email',
                required: true,
                type: 'text',
                isEmail: true,
                triggerType: 'change'
            },
            {
                id: 'oJucarie',
                parent: 'item-box-container',
                required: true,
                type: 'checkbox',
                triggerType: 'click'
            },
            {
                id: 'douaJucarie',
                parent: 'item-box-container',
                fieldLabel: 'Jucarie box',
                required: true,
                type: 'checkbox',
                triggerType: 'click'
            },
            {
                id: 'conditii',
                required: true,
                type: 'checkbox',
                triggerType: 'click'
            },
            {
                name: 'subscription',
                parent: 'radiobox-wrapper',
                required: true,
                type: 'radiobox',
                triggerType: 'click'
            },




        ]


        var options = {
            inputsList: inputsList
        }

        var formValidator = new FormValidator(options);

        $("#valideaza").on("click", function() {
            formValidator.validateAll();
            formValidator.inputsDetails

            if (formValidator.isValid) {
                //go foward
            }
            console.log(formValidator.inputsDetails)
            console.log(formValidator.isValid)
        })

        // valideaza.setoceapa();
    }
})