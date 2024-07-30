// 2 actions: to push user data and delete user data

export const SET_USER = (user) => {
    return {
        type: "SET_USER",
        user: user,
    };
};

export const SET_USER_NULL = () => {
    return {
        type: "SET_USER_NULL",
    };
};