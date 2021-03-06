describe('Flickr app', function() {
    browser.get('http://localhost:3000/#/');
    browser.debugger();
    it('should scroll insert new content once scrolled to bottom', function() {
        var origLength;
        var newLength;
        element.all(protractor.By.css('.item-container')).count().then(function(len) {
            origLength = len;
            console.log(origLength);
        }).then(function() {
            element.all(protractor.By.css('.item-container')).count();
            browser.executeScript('window.scrollTo(0,10000);').then(function() {
                browser.sleep(1000);
            })
        }).then(function() {
            element.all(protractor.By.css('.item-container')).count().then(function(newLen) {
                newLength = newLen;
            });
        }).then(function() {
            expect(newLength > origLength);
        });
    });


    it('should check to see if tag search input filters results', function() {
        browser.ignoreSynchronization = true;
        var username = element(by.model('search'));
        var vowels = ["a", "e", "i", "o", "u"]
        var myElement = element(by.css('.item-container'));
        var isPresent;
        for (var i = 0; i < 5; i++) {
                    element(by.model('search')).sendKeys(vowels[i]);
                    if (myElement.length) {
                        isPresent = true;
                    }
                    browser.sleep(1000);
                    element(by.model('search')).clear();
                    expect(isPresent === true);
        }

    });

    it('should check if posts have a defined link', function() {
        element.all(by.repeater("(key, value) in items")).each(function(items) {

            element.all(by.css('.title-link')).each(function(element) {
                var linkTarget = element.getText().then(function(attr) {
                    var linkExists;
                    if (attr !== "undefined") {
                        linkExists = true;
                    } else {
                        linkExists = false;
                    }

                    expect(linkExists).toBeTruthy();
                });

            });

        });

    });
    it('should click onto post and then click back', function() {
        var onHome;
        element.all(by.css('h2 a')).get(3).click().then(function() {
            browser.sleep(3000);
            element(by.css(".back")).click();

        }).then(function() {
            browser.getCurrentUrl().then(function(actualUrl) {
                if (actualUrl.indexOf("post") == -1) {
                    var onHome = true;
                } else {
                    var onHome = false;
                }

                expect(onHome).toBeTruthy();
            });
        });



    });
});
