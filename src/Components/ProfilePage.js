import ProfileForm from './ProfileForm';

const ProfilePage = () => {

    return (
        <main className="min-h-screen p-10 bg-zinc-200">
            <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10 mt-8 pt-10">Profile</h1>
            <ProfileForm />
        </main>
    )
}

export default ProfilePage;