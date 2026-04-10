import { useEffect } from "react";

function PasswordValidator({ password , setOn}) {
  const rules = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /\d/.test(pw) },
    { label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
  ];
const isValid =  rules.every((rule) => rule.test(password));
useEffect(()=>{
  if(isValid){
    setOn(false);
  }
} , [isValid]);
  return (
    <div className="shadow-xl rounded p-3 w-64 bg-gray-50">
      <p className="font-semibold mb-2">Password must contain:</p>
      <ul className="space-y-1">
        {rules.map((rule, idx) => {
          const valid = rule.test(password);
          return (
            <li
              key={idx}
              className={valid ? "text-green" : "text-red-500"}
            >
              {valid ? "✔" : "✖"} {rule.label}
            </li>
          );
        })}
      </ul>
      {
        isValid && <p className="text-green font-semibold mt-2">Perfect, Good to go further!!</p>
      }
    </div>
  );
}

export default PasswordValidator;
