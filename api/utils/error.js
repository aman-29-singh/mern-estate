/*there are some situation that there is no error in system but we want to throw an error for example 
the password that user is putting is not a long enough so its not error but we can just create an error
for that so we need to create a function to handle this kind of error so here inside the api folder we
have to create on folder called utils and inside this utils we will create file called error.js
so in this file erroj.s mein hum function create karenge to handle error*/

export const errorHandler = (statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}