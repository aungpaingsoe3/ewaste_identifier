// Reference:
// How to Use Deepseek AI API for Free Build AI ChatBot  (100% FREE!) [WebStylePress] https://www.youtube.com/watch?v=ECxtBChPbk0
// React Website Tutorial - Beginner React JS Project Fully Responsive [Brian Design] https://www.youtube.com/watch?v=I2UBjN5ER4s
import React, { useState, useEffect } from "react";

function Troubleshooting() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // TODO: add retriction to load when home passes data
    // will not run when home does not pass data to troubleshooting
    useEffect(() => {
        const fetchTroubleshooting = async () => {
            // TODO: get data from home page instead of hardcoding
            const device_and_model = "MacBook Pro 2015";
            const issue = "won't turn on";
            const content = "Provide a structured, step-by-step troubleshooting guide for a " + device_and_model + " experiencing " + issue + ". Format the response as follows:\n\nIntroduction: Briefly describe the importance of troubleshooting this issue and what users should expect.\nThe Basics: Quick initial checks and simple fixes to rule out common problems.\nCauses: List potential causes and troubleshooting steps, each with:\nA clear heading for the issue (e.g., 'Faulty Power Source').\nStep-by-step instructions for diagnosis and resolution.\nIf applicable, signs to look for (e.g., LED indicators, noises, physical damage).\nAdditional notes (e.g., safety precautions, when to seek professional help).";
            
            setLoading(true);
            setError(null);
            
            try {
                const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        // "Authorization": 'Bearer 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',
                        "Authorization": process.env.REACT_APP_OPENROUTER_API_KEY,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "deepseek/deepseek-r1-zero:free",
                        messages: [
                            { role: "user", content: content },
                        ],
                    }),
                });

                if (!res.ok) {
                    throw new Error(`API Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                console.log(data);
                let response = data.choices?.[0]?.message?.content || "No response received.";
                response = response.replace(/\\boxed{/g, '')
                    .replace(/```markdown/g, '')
                    .replace(/```/g, '')
                    .replace(/}/g, '');
                setResponse(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTroubleshooting();
    }, []);

    return (
        <div className="App">
            <h1>Troubleshooting</h1>
            <div id="response">
                {loading && <p>Loading...</p>}
                {error && <p className="error">Error: {error}</p>}
                {response && <div dangerouslySetInnerHTML={{ __html: window.marked.parse(response) }} />}
            </div>
        </div>
    );
};

export default Troubleshooting;
