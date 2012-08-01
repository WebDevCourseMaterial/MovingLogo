<h1>Closure tools setup</h1>

Closure is a web development tool that was open sourced by Google in 2010.<br>
https://developers.google.com/closure/

The Closure suite of tools consist of 5 useful tools
<ul>
<li>Compiler</li>
<li>Library</li>
<li>Templating system (Soy)</li>
<li>Linter</li>
<li>Stylesheets system</li>
</ul>

* * *
Create a folder called 'closure' to hold the tools in the Closure suite.  Once setup is complete you will have 5 folders within this closure folder:
<ul>
<li><strong>closure-compiler</strong> (svn checkout http://closure-compiler.googlecode.com/svn/trunk/ closure-compiler)</li>
<li><strong>closure-library</strong> (svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library)</li>
<li><strong>closure-templates</strong> (svn checkout http://closure-templates.googlecode.com/svn/trunk/ closure-templates)</li>
<li><strong>closure-linter</strong> (svn checkout http://closure-linter.googlecode.com/svn/trunk/ closure-linter)</li>
<li><strong>closure-stylesheets</strong> (git clone https://code.google.com/p/closure-stylesheets/)</li>
</ul>

To setup the Closure tools you will need to checkout all 5 repos.  Additionally you will need to build from source a .jar file for three of the projects (the compiler, templating system, and stylesheet system).

<h3>Ant</h3>
Before you can build any of the sources, you'll first need to install Ant if you don't have it already.

If you are using Windows, try http://code.google.com/p/winant/.

When installing Ant, be sure to use a Java 1.6 SDK or some later steps may fail.

<h3>Compiler</h3>
Docs about Closure's JavaScript compiler: https://developers.google.com/closure/compiler/<br>
Project home: https://code.google.com/p/closure-compiler/<br>
Here are the specific checkout and build commands I'm using on my Mac.

    svn checkout http://closure-compiler.googlecode.com/svn/trunk/ closure-compiler
    cd closure-compiler
    ant jar
    cd ..

Make sure it ends with a line stating:<br>
Building jar: <your path>/closure/closure-compiler/build/compiler.jar<br>
BUILD SUCCESSFUL

<h3>Library</h3>
Docs about Closure library: https://developers.google.com/closure/library/<br>
Project home: http://code.google.com/p/closure-library/<br>
My checkout command:

    svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library

No building step necessary, just a checkout.

<h3>Templating system (Soy)</h3>
Docs about Closure's templating system: https://developers.google.com/closure/templates/<br>
Project home: http://code.google.com/p/closure-templates/<br>
My checkout and build commands:

    svn checkout http://closure-templates.googlecode.com/svn/trunk/ closure-templates
    cd closure-templates
    ant SoyToJsSrcCompiler
    cd ..

Make sure it ends with a line stating: <br>
Building jar: <your path>/closure/closure-templates/build/SoyToJsSrcCompiler.jar<br>
BUILD SUCCESSFUL

<h3>Linter</h3>
Docs about Closure's Linter: https://developers.google.com/closure/utilities/<br>
JavaScript Guidelines checked: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml<br>
Project home: http://code.google.com/p/closure-linter/<br>
Checkout command:

    svn checkout http://closure-linter.googlecode.com/svn/trunk/ closure-linter

No building step necessary, just a checkout.

<h3>Stylesheets</h3>
Docs about Closure's Stylesheet minification: http://code.google.com/p/closure-stylesheets/<br>
Project home: http://code.google.com/p/closure-stylesheets/<br>
Checkout and build commands:

    git clone https://code.google.com/p/closure-stylesheets/
    cd closure-stylesheets
    ant

Make sure it ends with a line stating:<br>
Building jar: <your path>/closure/closure-stylesheets/build/closure-stylesheets.jar<br>
BUILD SUCCESSFUL


* * *
So now you've got all the Closure tools installed and ready to go!  Now how do you use them?