const SetSectionsProgress = (sections: Array<boolean>) => {
    return {
        type: "GET_TESTING_PROGRESS",
        sections
    } as const
}

const SetSectionCompleteAction = (sectionNumber: number) => {
    return {
        type: "SET_SECTION",
        sectionNumber
    } as const
}

export {
    SetSectionsProgress,
    SetSectionCompleteAction,
}