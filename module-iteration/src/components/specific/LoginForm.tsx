
interface LoginFormProps {
    handleSubmit: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {


    return (
        <form
            onSubmit={handleSubmit}> 


        </form>
    )
}

export default LoginForm;