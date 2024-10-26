export const APIS = {
    ROOMS: "/rooms",
    ROOM_BY_ID: "/rooms/:id",
    ACTIVE_ROOMS: "/active-rooms",
    PEERS: "/active-rooms/:roomId/peers",
    PEER_BY_ID: "/active-rooms/:roomId/peers/peerId",
    ROOMS_CODE: "/room-codes/room/:roomId",
    LIVE_CLASS: "https://elearning-class.app.100ms.live/meeting/:roomCode",
    SESSIONS_BY_ROOM_ID: "/sessions?roomId=:roomId&active=true",
    SESSION_BY_SESSION_ID: "/sessions/:sessionId",
    CREATE_ORGANIZATION: "/api/organization/create",
    USER_LOGIN: "/api/auth/login",
    CREATE_STUDENT: "/api/student/create",
    LIST_STUDENT: "/api/student",
    FETCH_STUDENT: '/api/student/fetch',
    EDIT_STUDENT: "/api/student/:id",
    UPDATE_STUDENT_ENROLLMENTS: '/api/student/update-enrollments',
    CREATE_TEACHER: '/api/teacher/create',
    FETCH_CLASS: '/api/class/fetch',
    CREATE_CLASS: '/api/class/create',
    FETCH_TEACHERS: '/api/teacher/fetch',
    UPDATE_TEACHER: '/api/teacher/update',
    CREATE_ONLINE_CLASS: '/api/onlineClass/create',
    FETCH_ONLINE_CLASS: '/api/onlineClass/fetch',
    FETCH_RECORDINGS: '/api/recordedClass/fetch',
    GET_RECORDINGS_BY_ROOM_ID: '/recordings?room_id=:roomId',
    FETCH_RECORDINGS_BY_ROOM_ID: '/api/onlineClass/recordings',
    GET_STUDENTS: '/api/student/fetch',
    DELETE_STUDENTS: '/api/student/delete',
    UPDATE_STUDENTS: '/api/student/update',
    UPLOAD_DOCUMENT: 'api/gemini/upload-file',
    CREATE_QUESTIONS: 'api/gemini/create-questions',
    CHAT_BOT: 'api/gemini/chat-assistance',
    SAVE_CHAT_HISTORY: '/api/chat/create',
    FETCH_CHAT_HISTORY: '/api/chat/fetch',
    GET_CLASSES: "/api/class/fetch",
    WHOAMI: '/api/user/whoami',
    UPDATE_TEACHER_ENROLLMENTS: '/api/teacher/update-enrollments',
    FETCH_TEACHER_ENROLLED_CLASSES: '/api/teacher/fetch-classes',
    DELETE_TEACHER: '/api/teacher/delete',
    CREATE_PARENT: '/api/parent/create',
    FETCH_PARENT: 'api/parent/fetch',
    DELETE_PARENT: '/api/parent/delete',
    UPDATE_PARENT: '/api/parent/update',
    MODULE_MANAGEMENT_MODULES: '/api/module-management/modules',
    MODULE_MANAGEMENT_UNSUBSCRIBE: '/api/module-management/unsubscribe',
    MODULE_MANAGEMENT_SUBSCRIBE: '/api/module-management/subscribe',
    DASHBOARD_COUNTS: '/api/dashboard/counts'
}

export const SCHEMA_APIS = {
    TEACHER: "/api/schema/Teacher",
    STUDENT: "/api/schema/Student",
    ORGANIZATION: "/api/schema/Organization",
    BRANCH: "/api/schema/Branch",
    AUTH: "/api/schema/Auth",
    ONLINE_CLASS: "/api/schema/OnlineClass",
    SCHEMA_BY_SERVICE: '/api/schema/:service',
    CREATE_ORGANIZATION: "/api/organization/create",
    PARENT: '/api/schema/Parent'
}

export const ORGANIZATION_TYPE = [
    'School',
    'College',
    'Coaching',
    'Individual'
]

export const examplePrompt = ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quesstion title</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #555;
        }
        .question {
            margin: 20px 0;
        }
        .answer-key {
            background-color: #eaeaea;
            padding: 10px;
            border-left: 4px solid #333;
        }
    </style>
</head>
<body>

    <h1>Question paper title</h1>

    <h2>Instructions:</h2>
    <p>Read the information about Vinayak and choose the best answer for each question.</p>

    <div class="question">
        <h2>1.Question?</h2>
        <ul>
            <li>a) Option 1</li>
            <li>b) Option 2</li>
            <li>c) Option 3</li>
            <li>d) Option 4</li>
        </ul>
    </div>


    <div class="answer-key">
        <h2>Answer Key:</h2>
        <p>1. b</p>
    </div>

</body>
</html>`

export const ROUTES = {
    DASHBOARD: '/dashboard',
    TEACHERS: '/dashboard/teachers',
    RECORDED_CLASSES: '/dashboard/recorded-classes',
    RECORDED_CLASS_BY_ROOM_ID: '/dashboard/recorded-classes/:roomId',
    PARENTS: '/dashboard/parents',
    PARENT_DETAILS: '/dashboard/parents/:parentId',
    STUDENTS: '/dashboard/students',
    STUDENT_DETAILS: '/dashboard/students/:studentId',
    CLASSES: '/dashboard/classes',
    CLASS_DETAILS: '/dashboard/classes/:classId',
    ONLINE_CLASSES: '/dashboard/online-classes',
    ONLINE_CLASS_DETAILS: '/dashboard/online-classes/:classId',
    QUESTIONNAIRE: '/dashboard/questionnaire',
    QUESTIONNAIRE_DETAILS: '/dashboard/questionnaire/:questionId',
    AI_ASSISTANCE: '/dashboard/ai-assistance',
    AI_ASSISTANCE_DETAILS: '/dashboard/ai-assistance/:aiId',
    USER_PROFILE: '/dashboard/user/profile',
    USER_SETTINGS: '/dashboard/user/settings'
}

export const defaultMsgBody = {
    parts: [{ text: "" }],
    role: 'user',
};

export const USER_TYPE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ORG_ADMIN: 'ORG_ADMIN',
    BRANCH_ADMIN: 'BRANCH_ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
    PARENT: 'PARENT'
}

export const MODULES_MAPPING = {
    teachers: '/dashboard/teachers',
    students: '/dashboard/students',
    classes: '/dashboard/classes',
    onlineClasses: '/dashboard/online-classes',
    questionnaire: '/dashboard/questionnaire',
    aiAssistance: '/dashboard/ai-assistance'
}


export const getFormIDConstants = {
    country: 'countryId',
    state: 'stateId',
    city: 'cityId',
} 