/*

name
website
imageUrl
no_of_employees
funding_Stage
industry:
benefits {
    gym_membership
    free_doctor_on_call
    number_of_paid_leaves
    flexible_work_timings
    remote_work_friendly
    health_insurance
    health_insurance_data {
        sum_insured
        family_covered
        parents_covered
        maternity_covered
    }
}


*/

const fs = require('fs');
const path = require('path');

fs.readFile(path.join('Output','combinedData.json'),function(err, data){
    if(err) throw err;
    let jsonData = JSON.parse(data);
    let updatedJsonData = jsonData.map(obj => {
        let health_insurance = Math.floor(Math.random()*2) ? true : false;
        let health_insurance_data = {
            sum_insured: false,
            family_covered: false,
            parents_covered: false,
            maternity_covered: false,
        }
        if(health_insurance){
            health_insurance_data = {
                sum_insured: Math.floor(Math.random()*2) ? true : false,
                family_covered: Math.floor(Math.random()*2) ? true : false,
                parents_covered: Math.floor(Math.random()*2) ? true : false,
                maternity_covered: Math.floor(Math.random()*2) ? true : false
            }
        }
        return {
            ...obj,
            funding_Stage: 'Unknown',
            benefits: {
                gym_membership: Math.floor(Math.random()*2) ? true : false,
                free_doctor_on_call: Math.floor(Math.random()*2) ? true : false,
                number_of_paid_leaves: 'Not Unlimited',
                flexible_work_timings:  Math.floor(Math.random()*2) ? true : false,
                remote_work_friendly:  Math.floor(Math.random()*2) ? true : false,
                health_insurance: health_insurance,
                health_insurance_data: health_insurance_data
            }
        }
    });
    fs.writeFile(path.join('Output','generatedData.json'),JSON.stringify(updatedJsonData),function(err){
        if(err) throw err;
        console.log('[generatedData.json] Saved Succesfully!');
    });
});