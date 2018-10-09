# copy-line-number
Copy Line Number copies the file name and line number of the pointer in the specified format.  
Default format has been adjusted for Chrome Dev tool and atom fuzzy finder.

## How to use
Copy the format with the file name and line number currently selected.
### Keyboard shortcut
Windws and Linux : <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>C</kbd>  
Mac : <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>C</kbd>
### and more
+ Context menu > Copy line number
+ menu > package > Copy line number > Copy line number
+ Command Palette : `Copy line number:Copy`

## How to setting
Settings>**format** String to be copied.
Replace the characters in the string.
+ {1} => File name
+ {2} => Line number
+ {3} => Selected text

ex.  

| Format | Result |
|:---|:---|
|`{1}:{2}`|2 |
|`Line {2} of {1}`|Line 10 of hoge.txt |
|`{2}:{3}`| 10: hogehoge |
