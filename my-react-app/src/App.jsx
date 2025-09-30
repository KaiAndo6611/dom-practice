import './App.css'
import Header from "./header";
import Main from "./Body";
import Footer from "./Footer";
import { Routes, Route } from 'react-router-dom';

import TinyTodo from "./TinyTodo";
import ApiSample from './Apisample';
import ApiSample2 from './ApiSample2';
import ApiOnMount from './ApiOnMount';
import ApiWithId from "./ApiWithId";
import PostList from "./PostList";
import UserList from "./UserList";
import UserListAxios from "./UserListAxios";
import UsersExplorer from "./UsersExplorer";
import TextInputSample from "./TextInputSample";
import FormMultiInputs from "./FormMultiInputs";
import SelectSample from "./SelectSample";
import CheckRadioSample from "./CheckRadioSample";
import FormObjectSample from "./FormObjectSample";
import FormSubmitValidate from "./FormSubmitValidate";
import ProfileForm from "./ProfileForm";
import PostDetail from "./PostDetail"; 
import NotFound from "./NotFound"; 
import Home from "./Home";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/tiny-todo" element={<TinyTodo />} />
        <Route path="/api-sample" element={<ApiSample />} />
        <Route path="/form-validation" element={<FormSubmitValidate />} />
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>

      {/* <Main /> */}
      {/* <TinyTodo /> */}
      {/* <ApiSample /> */}
      {/* <ApiSample2 /> */}
      {/* <ApiOnMount/> */}
      {/* <ApiWithId /> */}
      {/* <PostList /> */}
      {/* <UserList/> */}
      {/* <UserListAxios/> */}
      {/* <UsersExplorer/> */}
      {/* <TextInputSample /> */}
      {/* <FormMultiInputs /> */}
      {/* <SelectSample /> */}
      {/* <CheckRadioSample /> */}
      {/* <FormObjectSample /> */}
      {/* <FormSubmitValidate /> */}
      {/* <ProfileForm /> */}
      <Footer />
    </div>
  );
}
