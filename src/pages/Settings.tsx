
import React from 'react';
import { Shell } from '@/components/Layout/Shell';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { 
  User, Bell, Shield, Database, Cloud, GitBranch, SquareCode, Mail, 
  CreditCard, Settings as SettingsIcon, Server, Lock
} from 'lucide-react';

const Settings = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
      }
    }
  };

  return (
    <Shell>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6">
              <TabsTrigger value="general">
                <SettingsIcon className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="account">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <GitBranch className="mr-2 h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="api">
                <SquareCode className="mr-2 h-4 w-4" />
                API
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Manage your general application preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Your Company, Inc." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Time (US & Canada)</option>
                      <option value="cst">Central Time (US & Canada)</option>
                      <option value="mst">Mountain Time (US & Canada)</option>
                      <option value="pst">Pacific Time (US & Canada)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable dark mode for the application
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Analytics</Label>
                      <div className="text-sm text-muted-foreground">
                        Share anonymous usage data to help us improve
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Supply Chain Manager" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="Operations" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Order Updates</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications when orders change status
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Inventory Alerts</Label>
                      <div className="text-sm text-muted-foreground">
                        Get alerts for low inventory items
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Shipping Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive updates about shipment status changes
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Announcements</Label>
                      <div className="text-sm text-muted-foreground">
                        Important announcements about the system
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">AI Insights</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive AI-generated insights about your supply chain
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your security preferences and authentication options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Integrations</CardTitle>
                  <CardDescription>
                    Manage your connected services and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Cloud className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium leading-none">Azure Cloud Services</p>
                        <p className="text-sm text-muted-foreground">Connected on Aug 12, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Database className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-sm font-medium leading-none">MongoDB Atlas</p>
                        <p className="text-sm text-muted-foreground">Connected on Oct 5, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium leading-none">SendGrid</p>
                        <p className="text-sm text-muted-foreground">Connected on Jan 23, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-8 w-8 text-indigo-500" />
                      <div>
                        <p className="text-sm font-medium leading-none">Stripe</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <GitBranch className="mr-2 h-4 w-4" />
                    Add New Integration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>
                    Manage your API keys and access to the system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex">
                      <Input value="sk_live_••••••••••••••••••••••••••••••" readOnly className="rounded-r-none" />
                      <Button variant="outline" className="rounded-l-none">
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last used: 2 hours ago from 192.168.1.1
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>API Endpoints</Label>
                      <Button variant="link" className="h-auto p-0">View Documentation</Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Orders API</div>
                          <div className="text-sm text-muted-foreground">https://api.example.com/v1/orders</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Separator />
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Inventory API</div>
                          <div className="text-sm text-muted-foreground">https://api.example.com/v1/inventory</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Separator />
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Shipments API</div>
                          <div className="text-sm text-muted-foreground">https://api.example.com/v1/shipments</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Rate Limiting</Label>
                      <div className="text-sm text-muted-foreground">
                        Protect your API from excessive use
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Revoke Key</Button>
                  <Button>Generate New Key</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </Shell>
  );
};

export default Settings;
