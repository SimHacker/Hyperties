LaserJet Explorer README.TXT file.

This file has descriptions of the HP Explorer software programs and 
instructions for installing HP Explorer software.  There is also some 
additional information that is not contained in the manual. 

CONTENTS:

A.  HP EXPLORER SOFTWARE
       SETUP
       THE TRAVEL GUIDE
       REMOTE CONTROL PANEL
B.  PREPARING FOR YOUR TRIP
       SYSTEM REQUIREMENTS
       INSTALLING HP EXPLORER SOFTWARE
C.  USE YOUR HP EXPLORER SOFTWARE ANYTIME
D.  THE REMOTE CONTROL PANEL REQUIRES DIRECT CONNECT BITRONICS
E.  FASTMODE FOR FASTER BAUD RATES
F.  CHANGING THE LOCATION OF HP EXPLORER
G.  NETWORK ADMINISTRATOR NOTES

-----------------------------------------------------------------------------

A.  HP EXPLORER SOFTWARE:

The HP Explorer software consists of three sections:  Setup, Travel Guide, and 
Remote Control Panel.

Use the Setup program to configure your HP LaserJet 4 printer and install the 
HP Explorer software.

The Setup program provides step-by-step instructions to help you install the 
HP Explorer software on you hard disk drive.  The Setup program will also aid 
you in correctly configuring you PC to work with your Hewlett-Packard LaserJet 
4 printer.  If your configuration changes, or if you want to delete a portion 
of the HP Explorer from your hard disk, just run the Setup program again by 
typing LJ4SETUP from the HP Explorer directory (for example, C:\EXPLORER>) and 
follow the instructions.

The Travel Guide will help you explore the new world of your HP LaserJet 4 
printer.

The Travel Guide is an informative pathfinder to the new features of the 
LaserJet 4 printer.  The main areas you will find include Printer Overview, 
Printer Control, Type, Printing Tasks, and Solving Problems.

This software program is designed to help explain the features of you HP 
LaserJet 4 printer, give you step-by-step instructions for completing common 
tasks, and give you quick answers to frequently asked questions regarding the 
HP LaserJet 4 printer.  Even if you've used an HP LaserJet printer before, 
you'll enjoy the Travel Guide.

The Remote Control Panel brings the printer's front control panel to your PC.

Now, you can change many of your printer settings without having to leave your 
PC or use the front control panel on your printer.  If your PC is directly 
connected to your HP LaserJet 4 printer, you can view and update the settings 
of your HP LaserJet 4 printer from your PC screen.

-----------------------------------------------------------------------------

B.  PREPARING FOR YOUR TRIP...

System requirements:  An HP LaserJet 4 printer, a DOS (version 3.31 or later) 
system computer with an Intel 286 microprocessor or greater, a 1.2 Mb or 
1.4 Mb floppy disk drive, 640 Kb RAM (450 Kb available), a VGA or better 
resolution monitor, and 2.2 MB of hard disk space available to install the 
complete HP Explorer software. 

1.  Be sure your HP LaserJet 4 printer and cables are set up and connected to 
your PC according to the instructions in the HP LaserJet 4 "Getting Started 
Guide."

2.  Turn on your computer.

3.  Turn the printer on and make sure it is on line.

4.  Insert the HP Explorer disk into your floppy disk drive (usually A: or B:).

(If you are using Windows, you must exit to the DOS prompt before installing 
the HP Explorer software.)

(If you want to install the Travel Guide on a network drive, see section
G.  NETWORK ADMINISTRATOR NOTES)

5.  At the DOS prompt, change to the drive where the HP Explorer disk is 
located (for example, the A: drive) and press the ENTER key.

6.  At the DOS prompt, (for example, A:>), type LJ4SETUP and press the ENTER 
key.  Follow the instructions on the screen.

-----------------------------------------------------------------------------

C.  USE YOUR HP EXPLORER SOFTWARE ANYTIME

Once you have installed the HP Explorer software, you can access the different 
sections by typing a command from the DOS prompt of the HP Explorer directory.

To access the Setup program to make modifications, type LJ4SETUP at the 
directory prompt (for example, C:\EXPLORER\>  LJ4SETUP) and press ENTER.

To access the Travel Guide, type GUIDE4 at the directory prompt (for example, 
C:\EXPLORER\>  GUIDE4) and press ENTER. 

To access the Remote Control Panel, type RCP4 at the directory prompt (for 
example, C:\EXPLORER\>  RCP4) and press ENTER. 


-----------------------------------------------------------------------------

D.  THE REMOTE CONTROL PANEL REQUIRES DIRECT CONNECT BITRONICS

In order for the Remote Control Panel to work properly, it must be able to 
receive status information back from an HP LaserJet 4 printer.  Most devices 
connected between the HP LaserJet 4 printer and the PC will prevent the 
printer from sending data back to the PC.  The Remote Control Panel will not 
work with most hardware print spoolers (and some software print spoolers), a 
LaserJet Fax, and some switch boxes.  The Remote Control Panel also will not 
work with a network printer since the printer cannot send information back to 
the PC over the network. 

-----------------------------------------------------------------------------

E.  FASTMODE FOR FASTER BAUD RATES 

FASTMODE.EXE is a command line utility which allows the serial ports to be 
configured to a faster baud rate than allowed by the DOS MODE command.  It is 
designed for use with the HP LaserJet family of printers, and thus only 
supports 8 data bits, 1 stop bit, and no parity bit.  The choice of which port 
and baud rate are specified through required command line parameters.  
FASTMODE supports both COM1 and COM2 at the following baud rates:  300, 600, 
1200, 2400, 4800, 9600, 19200, 38400, and 57600. 
 
When a serial printer connection is selected during installation, LJ4SETUP 
will automatically install FASTMODE.EXE into the HP EXPLORER directory and add 
a command to your AUTOEXEC.BAT file with the appropriate parameters.

Examples: 

FASTMODE                This command will give a summary of its operation. 
FASTMODE /C1 /B38400    This command sets COM1 to 38400 baud. 
FASTMODE /C2 /B9000     This command sets COM2 to 9600 baud.  
                        (If the baud rate specified is not exactly supported,
                        fastmode assumes the next higher baud rate.)

-----------------------------------------------------------------------------

F.  CHANGING THE LOCATION OF HP EXPLORER 

Do not rename the directory where the HP Explorer Software is located.  There 
are several files created during installation which contain the location of HP 
Explorer. 

If it is necessary to change the location of the HP Explorer Software, either 
to change the drive or the directory, it is necessary to run LJ4SETUP to 
delete HP Explorer from the current location, and then run LJ4SETUP again from 
the installation floppy diskette to install HP Explorer to the new location.  

-----------------------------------------------------------------------------

G.  NETWORK ADMINISTRATOR NOTES

The Travel Guide files can be stored on a network drive to be shared by 
multiple users.  Copy all the files from the \EXPLORER\GUIDE directory to a 
directory on a network drive.  

The GUIDE4.BAT file in the \EXPLORER directory will need to be modified.  Each 
user will need their own copy of GUIDE4.BAT to start the Travel Guide.
The commands to change drive letter and directory will need to change to 
reference the network drive and directory where the Travel Guide has been 
copied.  Also the /X=SWAP.FIL parameter should be changed to point to a 
temporary file on the local hard disk, for example /X=C:\SWAP.FIL 

The Remote Control Panel is not supported on a network.  It will only work 
with a local printer.

