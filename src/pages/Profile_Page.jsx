import { useState } from 'react';
import { User, Mail, MapPin, Phone, Camera, Home, Settings, PlusCircle, Trash2, Edit, Save, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ProfilePage() {
  const [activePanel, setActivePanel] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const { darkMode } = useTheme();

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    avatarUrl: '/api/placeholder/120/120',
    addresses: [
      {
        id: 1,
        type: 'Home',
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        isDefault: true
      },
      {
        id: 2,
        type: 'Work',
        street: '456 Corporate Avenue, Suite 300',
        city: 'New York',
        state: 'NY',
        zipCode: '10022',
        isDefault: false
      }
    ],
    settings: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      twoFactorAuth: false
    }
  });

  const [formData, setFormData] = useState({...user});
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });
  const [addingNewAddress, setAddingNewAddress] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (setting) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting]
      }
    }));
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({...formData});
    setIsEditing(false);
    setEditingAddressIndex(null);
    console.log('Saving user data:', formData);
  };

  const handleSetDefaultAddress = (index) => {
    const updatedAddresses = formData.addresses.map((address, i) => ({
      ...address,
      isDefault: i === index
    }));

    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1);

    // If we deleted the default address, make the first one the default (if there is one)
    if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }

    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleAddNewAddress = () => {
    const newId = Math.max(0, ...formData.addresses.map(a => a.id)) + 1;

    // If this is the first address, make it default
    if (formData.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    const updatedAddresses = [
      ...formData.addresses,
      { ...newAddress, id: newId }
    ];

    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));

    setNewAddress({
      type: 'Home',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });

    setAddingNewAddress(false);
  };

  const handleCancel = () => {
    setFormData({...user});
    setIsEditing(false);
    setEditingAddressIndex(null);
    setAddingNewAddress(false);
  };

  const renderPanel = () => {
    switch (activePanel) {
      case 'personal':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <Edit size={18} />
                  Edit
                </button>
              ) : null}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <div className="p-2 bg-gray-100">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <div className="p-2 bg-gray-100">
                        <Mail size={20} className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <div className="p-2 bg-gray-100">
                        <Phone size={20} className="text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                    <User size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                    <Mail size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                    <Phone size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
              {!addingNewAddress && editingAddressIndex === null && (
                <button
                  onClick={() => setAddingNewAddress(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <PlusCircle size={18} />
                  Add Address
                </button>
              )}
            </div>

            {addingNewAddress ? (
              <div className="mb-8 border p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address Type</label>
                    <select
                      value={newAddress.type}
                      onChange={(e) => handleNewAddressChange('type', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => handleNewAddressChange('street', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => handleNewAddressChange('city', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => handleNewAddressChange('state', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      value={newAddress.zipCode}
                      onChange={(e) => handleNewAddressChange('zipCode', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div className="space-y-2 flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => handleNewAddressChange('isDefault', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Set as default address</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setAddingNewAddress(false)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNewAddress}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <Save size={18} />
                    Save Address
                  </button>
                </div>
              </div>
            ) : null}

            {formData.addresses.length > 0 ? (
              <div className="space-y-4">
                {formData.addresses.map((address, index) => (
                  <div key={address.id} className={`border rounded-lg p-4 ${address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    {editingAddressIndex === index ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Address Type</label>
                            <select
                              value={formData.addresses[index].type}
                              onChange={(e) => handleAddressChange(index, 'type', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="Home">Home</option>
                              <option value="Work">Work</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Street Address</label>
                            <input
                              type="text"
                              value={formData.addresses[index].street}
                              onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                              type="text"
                              value={formData.addresses[index].city}
                              onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                              type="text"
                              value={formData.addresses[index].state}
                              onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                            <input
                              type="text"
                              value={formData.addresses[index].zipCode}
                              onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                          >
                            <X size={18} />
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                          >
                            <Save size={18} />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="font-medium text-gray-800">{address.type} Address</span>
                            {address.isDefault && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">Default</span>}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingAddressIndex(index)}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <Edit size={18} />
                            </button>
                            {formData.addresses.length > 1 && (
                              <button
                                onClick={() => handleDeleteAddress(index)}
                                className="text-gray-500 hover:text-red-600"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin size={20} className="text-gray-500 mt-1" />
                          <div>
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                          </div>
                        </div>

                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(index)}
                            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Set as Default
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MapPin size={40} className="mx-auto mb-3 text-gray-400" />
                <p>You don't have any saved addresses yet.</p>
              </div>
            )}
          </div>
        );

      case 'avatar':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Picture</h2>

            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative mb-6">
                <img
                  src={user.avatarUrl}
                  alt="Profile Avatar"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                />
                <button className="absolute bottom-3 right-3 bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 shadow-md">
                  <Camera size={24} />
                </button>
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>

                <div className="flex gap-3 mt-6 justify-center">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                    Remove
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Upload New
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Recommended: Square image, at least 300x300 pixels.
                </p>
              </div>
            </div>
          </div>
        );

        case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
              {isEditing ? null : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <Edit size={18} />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive order updates and account notices</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.settings.emailNotifications}
                        onChange={() => handleSettingsChange('emailNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive order and delivery updates via text</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.settings.smsNotifications}
                        onChange={() => handleSettingsChange('smsNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Receive deals, discounts and product updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.settings.marketingEmails}
                        onChange={() => handleSettingsChange('marketingEmails')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Additional security for your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.settings.twoFactorAuth}
                        onChange={() => handleSettingsChange('twoFactorAuth')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete Account
                  </button>

                  <div className="flex-grow"></div>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive order updates and account notices</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${user.settings.emailNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.settings.emailNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive order and delivery updates via text</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${user.settings.smsNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.settings.smsNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Receive deals, discounts and product updates</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${user.settings.marketingEmails ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.settings.marketingEmails ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Additional security for your account</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${user.settings.twoFactorAuth ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div>Select a panel</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg-primary py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition">
                    <Camera size={16} />
                  </button>
                </div>
                <h1 className="text-xl font-bold dark:text-dark-text-primary">{user.name}</h1>
                <p className="text-gray-500 dark:text-dark-text-tertiary text-sm">{user.email}</p>
              </div>

              <div className="mt-6">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActivePanel('personal')}
                    className={`flex items-center gap-3 w-full p-3 rounded-md ${activePanel === 'personal' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'}`}>
                    <User size={20} />
                    <span>Personal Details</span>
                  </button>
                  <button
                    onClick={() => setActivePanel('addresses')}
                    className={`flex items-center gap-3 w-full p-3 rounded-md ${activePanel === 'addresses' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'}`}>
                    <Home size={20} />
                    <span>Address</span>
                  </button>
                  <button
                    onClick={() => setActivePanel('avatar')}
                    className={`flex items-center gap-3 w-full p-3 rounded-md ${activePanel === 'avatar' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'}`}>
                    <Camera size={20} />
                    <span>Avatar</span>
                  </button>
                  <button
                    onClick={() => setActivePanel('settings')}
                    className={`flex items-center gap-3 w-full p-3 rounded-md ${activePanel === 'settings' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'}`}>
                    <Settings size={20} />
                    <span>Account Settings</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}
