// Este es un ejemplo de cómo debería ser tu CreateUserForm.jsx
// Asegúrate de que la ruta de importación de BaseForm sea correcta.
import BaseForm from './BaseForm'; // <--- ¡Importación Corregida Aquí!

// El resto de tu código para CreateUserForm
// (Este es solo un esqueleto, deberías llenarlo con la lógica de tu formulario de usuario)

const CreateUserForm = ({
  isOpen,
  onClose,
  onCreate, // Función para crear/actualizar el usuario
  initialValue = {}, // Objeto para la edición de usuario
  isEditMode = false
}) => {
  const [userData, setUserData] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setUserData(initialValue);
    setErrorMessage('');
  }, [isOpen, initialValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccept = async () => {
    setErrorMessage('');

    // Validación básica
    if (!userData.username || !userData.email) {
      setErrorMessage('Los campos de usuario y email no pueden estar vacíos.');
      return;
    }

    try {
      await onCreate(userData); // Llama a la función que interactúa con la API de usuarios
      onClose();
      if (!isEditMode) setUserData({}); // Limpia el formulario si no es edición
    } catch (err) {
      setErrorMessage(err.message || 'Ocurrió un error inesperado al guardar el usuario.');
      console.error("Error en handleAccept de CreateUserForm:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <BaseForm
      title={isEditMode ? "Editar Usuario" : "Crear Usuario"}
      isVisible={isOpen}
      onAccept={handleAccept}
      onCancel={() => {
        setErrorMessage('');
        onClose();
      }}
      extra={errorMessage && (
        <p className="text-red-600 text-center mt-4 transition-opacity duration-300">
          {errorMessage}
        </p>
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Aquí irían los inputs específicos para el usuario */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="username" className="text-gray-700">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '100%', height: '50px', padding: '0.5rem' }}
            value={userData.username || ''}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '100%', height: '50px', padding: '0.5rem' }}
            value={userData.email || ''}
            onChange={handleChange}
          />
        </div>
        {/* Agrega más campos según tus necesidades (ej: contraseña, roles, etc.) */}
      </div>
    </BaseForm>
  );
};

export default CreateUserForm;