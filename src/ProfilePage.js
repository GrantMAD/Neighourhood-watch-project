import ProfileForm from './ProfileForm';

const ProfilePage = () => {

    return (
        <main class="p-10 bg-zinc-200">
            <h1 class="grid text-4xl place-content-center font-semibold underline underline-offset-8 mb-10">Profile</h1>
            <ProfileForm/> 
       </main>
    )
}

export default ProfilePage;