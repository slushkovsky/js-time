class Time {
	static get defaultFormat() { return '{hours}:{minutes}';      }
	static get regexGroups  () { return { Hours: 1, Minutes: 2 }; }

    constructor(hours, minutes) {
        this.hours   = parseInt(hours); 
        this.minutes = parseInt(minutes);

        this.validate();
    }

    validate() {
        assert(typeof this.hours   === 'number', 'Unexisted hours type');
        assert(typeof this.minutes === 'number', 'Unexisted minutes type');
        assert(this.hours   >= 0 && this.hours   < 24, 'Invalid hours value: '   + String(this.hours));
        assert(this.minutes >= 0 && this.minutes < 60, 'Invalid minutes value: ' + String(this.minutes));
    }

    static fromString(str, format) {
        // assert(typeof str === 'string', function(){ throw  })

        if (format === undefined) {
            format = Time.defaultFormat;
            console.log('Time format not given - will be used deafult: ' + Time.defaultFormat) 
        }

        var regex = new RegExp(pyformat(format, {
            hours:   '(\\d{1,2})', 
            minutes: '(\\d{2})'
        }));

        var match = regex.exec(str); 

        return new Time(match[Time.regexGroups.Hours  ],
        	            match[Time.regexGroups.Minutes]);
    }

    toString(format) {
        this.validate();

        function addZeros(str) {
            return str.length == 1 ? '0' + str : str; 
        }

        if (format === undefined) {
            format = Time.defaultFormat;
            console.log('Format not given - will be used deafult: ' + Time.defaultFormat) 
        }

        var result = pyformat(format, {
            hours:   addZeros(String(this.hours)), 
            minutes: addZeros(String(this.minutes)) 
        });

        this.validate();

        return result;
    }

    moreThan(other) {
        // assert typeof other

        this.validate();
        other.validate();

        var result = (this.hours > other.hours) || 
                     ((this.hours === other.hours) && 
                      (this.minutes > other.minutes));

        this.validate();
        other.validate();

        return result;
    }

    lessThan(other) {
        // assert typeof other

        this.validate();
        other.validate();

        var result = !Time.moreThan(other)

        this.validate();
        other.validate();

        return result;
    }

    static sumTime(t1, t2) {
        //  assert( typeof t1)
        //  assert( typeof t2)

        t1.validate(); 
        t2.validate();

        var sumHours   = t1.hours   + t2.hours; 
        var sumMinutes = t1.minutes + t2.minutes;

        if (sumMinutes >= 60) {
            sumHours += 1
            sumMinutes -= 60; 
        } 

        if (sumHours > 24) {
            throw 'Over than 24 hours';
        }

        return new Time(sumHours, sumMinutes);
    }
}