'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const FormSchema = yup
  .object({
    firstName: yup.string().required('First Name is required.'),
    lastName: yup.string().required('Last Name is required.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        {
          message: (
            <div>
              Password must contain at least one uppercase letter, one
              lowercase letter, one number, and one special character
              & 8 characters long.
            </div>
          ),
        }
      ),
    confirmPassword: yup.string(),
  })
  .required();

type FormData = yup.InferType<typeof FormSchema>;
interface UpdateProfileFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const UpdateProfile = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            className={''}
            // onSubmit={() => {
            //   console.log('submit');
            // }}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when youre
            done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          // onSubmit={() => {
          //   console.log('submit');
          // }}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function ProfileForm({
  className,
  UpdateProfileFormProps,
}: // onSubmit,
{
  className?: string;
  UpdateProfileFormProps?: UpdateProfileFormProps;
  // onSubmit: (data: FormData) => void;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(FormSchema),
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    console.log('Submit data: ', data);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // onSubmit(data);
  }

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target);
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          placeholder="John"
          disabled={isLoading}
          {...register('firstName')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="firstName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          placeholder="Doe"
          disabled={isLoading}
          {...register('lastName')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="username"
          placeholder="******"
          autoComplete="new-password"
          autoCorrect="off"
          disabled={isLoading}
          {...register('password')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="******"
          autoComplete="new-password"
          autoCorrect="off"
          disabled={isLoading}
          {...register('confirmPassword')}
        />
      </div>
      <Button disabled={isLoading} type="submit">
        Save changes
      </Button>
    </form>
  );
}

export default UpdateProfile;
