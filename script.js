// // script.js
const supabaseUrl = "https://gsbczcgdaatpfewgydca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function() {
    const createPollButton = document.getElementById('createPollButton');
    const goButton = document.getElementById('goButton');
    // const classCode = document.getElementById('classCode').value;
    
    goButton.addEventListener('click', async function() {
        const classCode = document.getElementById('classCode').value;
    
        if (!classCode || classCode.length !== 6) {
            console.log("Please enter a valid 6-digit code");
            return;
        }
        
        try {
            // Use a different approach to filter by the ending characters
            const { data, error } = await supabaseClient
                .rpc('find_poll_by_ending', { code_ending: classCode });
            
            if (error) throw error;
            
            // Check if any polls were found
            if (!data || data.length === 0) {
                console.log("No poll found with that code");
                return;
            }
            
            // Use the first matching poll if multiple were found
            let pollId = data[0].id;
            window.location.href = `votepage.html?pollId=${pollId}`;
        } catch (error) {
            console.error("Error finding poll:", error);
        }
    });
    // goButton.addEventListener('click', async function() {
    //     const { data, error } = await supabaseClient
    //         .from('polls')
    //         .select('*')  // Or specify just the columns you need 2fc53c
    //         .like('id', `*{classCode}`);
    //         // .filter('id::text', 'like', `%2fc53c`);
    //         // .filter('id::text', 'like', `%${classCodeInput.value}`);
    //     if (error) {
    //         console.log("Error finding poll: " + error)
    //     }
    //     // Check if any polls were found
    //     if (!data || data.length === 0) {
    //         console.log("No poll found with that code");
    //         return;
    //     }
        
    //     // Use the first matching poll if multiple were found
    //     let pollId = data[0].id;
    //     window.location.href = `votepage.html?pollId=${pollId}`;
    // })

    createPollButton.addEventListener('click', async function() {
        window.location.href = `pollcreation.html`;
    })
})
//         const classCode = classCodeInput.value;

//         if (classCode.trim() === "") {
//             alert("Please enter a class code.");
//         } else {
//             console.log("Class Code:", classCode);
//             // Or redirect, or send data, etc.
//             // Example redirect:
//             // window.location.href = "next_page.html?classCode=" + classCode;
//         }
//     });

//     createPollButton.addEventListener('click', function() {
//         window.location.href = 'pollcreation.html';
//     });
// });
