import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModalState: { show: false },
    roomsData: [],
    liveClassFormData: {},
    roomsCodeData: {},
    scheduleOnlineClassModalState: { show: false, data: null },
    addStudentModalState: { show: false, studentData: null, isEdit: false, makeRequest: null },
    addTeacherModalState: { show: false, teacherData: null },
    addClassModalState: { show: false, data: null },
    addParentModalState: { show: false },
    userData: {},
    notificationBarState: { show: false, title: 'success', description: '', isError: null },
    isLoading: false,
    confirmationModal: {
        isOpen: false,
        title: '',
        description: '',
        onConfirm: null,
    },
    selectedClassForViewRecordings: [],
    chatBotData: { loading: false, data: [], chatId: '' },
    ChatHistoryData: [],
    assignToClassModalState: { show: false, assigneeData: null, editType: '' }
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setLoginModal(state, action) {
            state.loginModalState = { ...state.loginModalState, ...action.payload }
        },
        setRoomsData(state, action) {
            state.roomsData = action.payload
        },
        setLiveClassFormData(state, action) {
            state.liveClassFormData[action.payload.id] = { ...state.liveClassFormData[action.payload.id], ...action.payload.data }
        },
        setRoomsCodeData(state, action) {
            state.roomsCodeData[action.payload.id] = action.payload.data
        },
        setScheduleOnlineClassModalState(state, action) {
            state.scheduleOnlineClassModalState = { ...state.scheduleOnlineClassModalState, ...action.payload }
        },
        resetLiveClassFormData(state) {
            state.liveClassFormData = {}
        },
        setAddStudentModalState(state, action) {
            state.addStudentModalState = { ...state.addStudentModalState, ...action.payload }
        },
        setAddTeacherModalState(state, action) {
            state.addTeacherModalState = { ...state.addTeacherModalState, ...action.payload }
        },
        setAddClassModalState(state, action) {
            state.addClassModalState = { ...state.addClassModalState, ...action.payload }
        },
        setAddParentModalState(state, action) {
            state.addParentModalState = { ...state.addParentModalState, ...action.payload }
        },
        setUserData(state, action) {
            state.userData = { ...state.userData, ...action.payload }
        },
        setNotificationBarState(state, action) {
            state.notificationBarState = { ...state.notificationBarState, ...action.payload }
        },
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        },
        showConfirmationModal: (state, action) => {
            state.confirmationModal = {
                isOpen: true,
                ...action.payload,
            };
        },
        hideConfirmationModal: (state) => {
            state.confirmationModal = {
                isOpen: false,
                title: '',
                description: '',
                onConfirm: null,
            };
        },
        setSelectedClassForViewRecordings: (state, action) => {
            state.selectedClassForViewRecordings = action.payload
        },
        setChatHistoryListData(state, action) {
            state.ChatHistoryData = [...state.ChatHistoryData, action.payload]
        },
        setChatHistoryList(state, action) {
            state.ChatHistoryData = action.payload;
        },
        updateChatHistory(state, action) {
            const { data, id } = action.payload;
            const chatHistoryIndex = state.ChatHistoryData.findIndex((chatHistory) => chatHistory.chatId === id);
            if (chatHistoryIndex !== -1) {
                state.ChatHistoryData[chatHistoryIndex] = { ...state.ChatHistoryData[chatHistoryIndex], data }
            }

        },
        setChatBotData(state, action) {
            state.chatBotData = action.payload
        },
        setAssignToClassModalState(state, action) {
            state.assignToClassModalState = { ...state.assignToClassModalState, ...action.payload }
        }
    },
})

export const { setLoginModal, setRoomsData, setLiveClassFormData, setRoomsCodeData, setScheduleOnlineClassModalState, resetActiveLiveClassFormData,
    setAddStudentModalState, setAddTeacherModalState, setAddClassModalState, setAddParentModalState, setUserData, setNotificationBarState, showLoader, hideLoader, showConfirmationModal,
    hideConfirmationModal, setSelectedClassForViewRecordings, setChatBotData, setChatHistoryList, setChatHistoryListData, updateChatHistory, setAssignToClassModalState } = storeSlice.actions
export default storeSlice.reducer


