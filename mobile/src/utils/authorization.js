import { useStore } from '../composables/store';

const { username } = useStore();

export function couldEdit(biovers)  {
    if (biovers.is_editable) {
        return true;
    }
    if (username.value === biovers.User.username) {
        return true;
    }
    return false;
}