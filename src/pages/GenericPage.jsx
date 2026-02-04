
const GenericPage = ({ title, content }) => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
            <div className="prose prose-lg text-gray-600">
                <p>{content}</p>
                <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mt-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
};

export default GenericPage;
