class Worker {
    constructor(age, childs, health, dental, has_dental, percentage, age_limit){
        this.age = age;
        this.childs = childs;
        this.health = health;
        this.dental = dental;
        this.has_detal = has_dental;
        this.percentage = percentage;
        this.age_limit = age_limit;
    }

    getCoverageHealth(){
        let coverage = 0;
        if (this.percentage > 0 && this.age <= this.age_limit) {
            coverage = this.health * (this.percentage / 100);
        }
        return coverage;
    }

    getCoverageDental(){
        let coverage = 0;
        if (this.percentage > 0 && this.age <= this.age_limit && this.has_detal === true) {
            coverage = this.dental * (this.percentage / 100);
        }
        return coverage;
    }

    getCoverage(){
        return {
            "age": this.age,
            "children": this.childs,
            "company_coverage": {
                "health": this.getCoverageHealth(),
                "dental": this.getCoverageDental()
            },
            "co_payment": {
                "health": this.health - this.getCoverageHealth(),
                "dental": this.dental - this.getCoverageDental()
            }
        };
    }
}

module.exports = Worker;
