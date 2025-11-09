export const APIConstant = {
    LOGIN:{
        GET_LOGIN:'User/login'
    },
    MASTER:{
        GET_ALL_MASTER:'Master/get-all-masters',
        CREATE_NEW_MASTER:'Master/create-master',
        UPDATE_MASTER:'Master/update-master/',
        DELETE_MASTER:'Master/delete-master/',
        GET_ALL_FILTER_MASTER:'Master/get-masters-by-type/'
    },
    PACKAGE:{
        GET_ALL_PACKAGES:'PackageMaster/get-all-packages',
        CREATE_NEW_PACKAGES:'PackageMaster/create-package',
        UPDATE_PACKAGES:'PackageMaster/update-package/',
        DELETE_PACKAGES:'PackageMaster/delete-package/',
        GET_ALL_FILTER_PACKAGES_BY_ID:'/PackageMaster/get-package-by-id/'
    },
    INSTITUTE:{
        GET_ALL_INSTITUTE:'InstituteMaster/get-all-institutes',
        CREATE_NEW_INSTITUTE:'InstituteMaster/create-institute',
        UPDATE_INSTITUTE:'InstituteMaster/update-institute/',
        DELETE_INSTITUE:'InstituteMaster/delete-institute/',
        GET_ALL_FILTER_INSTITUTE_BY_ID:'InstituteMaster/get-institute-by-id/'
    },
    BRANCH:{
        GET_ALL_BRANCHES:'BranchMaster/get-all-branches',
        CREATE_NEW_BRANCH:'BranchMaster/create-branch',
        UPDATE_BRANCH:'BranchMaster/update-branch',
        DELETE_BRANCH:'BranchMaster/delete-branch/',
        GET_BRANCH_BY_ID:'BranchMaster/get-branch-by-id/'

    }
}

export const ToastMessages = {
  SAVE_SUCCESS: { message: 'Data saved successfully', title: 'Save' },
  UPDATE_SUCCESS: { message: 'Data updated successfully', title: 'Update' },
  DELETE_SUCCESS: { message: 'Data deleted successfully', title: 'Delete' },
  ERROR: { message: 'Something went wrong, please try again.', title: 'Error' },
  FILTER:{ message:'branch filter successfully', title:'load'}
};