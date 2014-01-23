// Sudoku Solution Validator

// A sudoku board contains 81 cells arranged in a 9x9 grid. The game has 3 basic "units": rows, columns and boxes. Boxes are the 3x3 "minigrids". A valid solution consists of a grid in which all units contain the digits 1-9. Here's a picture of one:

// http://www.thedailyaztec.com/content/uploads/Sudoku_5-10.jpg

// You could represent a grid as a string, where each character represents a cell, starting in the top-left corner and moving row-by-row down to the bottom-right. For example, the string representing the grid in the above picture would be:

// grid = "357964281468123579912587463631795842724318695895246137176459328583672914249831756"

// Please write the following function:

// def is_valid_solution(grid):

// It should take a string (either str or unicode) and return a boolean: True if the string represents a valid sudoku solution (i.e., all rows, columns and boxes each contain 1-9), False if not.

// Two things before starting:

// Do not throw an exception. Return True if the grid is valid and False under all other circumstances. Assume nothing about grid. Obviously, it needs to be a string that's 81 characters long, but it might not be. It could, for instance, be an integer or the string "hello". Again, if so, just return False.

// Do not worry about performance. Optimize for code clarity.

// Test Cases:

// 751843926893625174642179583425316798176982345938754612364297851289531467517468239

// 751843927893625174642179583425316798176982345938754612364297851289531467517468239

// 571843926893625174642179583425316798176982345938754612364297851289531467517468239

// 851743926
// 693825174
// 142679583
// 425316798
// 976182345
// 738954612
// 364297851
// 289531467
// 517468239
// 
//
var row_size = 9;
var column_size = 9;
var box_width = 3;
var box_height = 3;
var box_rows = 3;
var box_columns = 3;

function is_valid_solution( grid )
{
	// It's not a string. Abort.
	if ( typeof ( grid ) !== "string" ) return false;

	// It's a string, but not the right size. Abort.
	if ( grid.length !== 81 ) return false;

	// It's not a number
	if ( isNaN( grid ) ) return false;

	return valid_rows( grid ) && valid_columns( grid ) && valid_boxes( grid );

}

function row_split( grid )
{
	var rows = {};
	for ( var i = 0; i < grid.length; i += row_size )
	{
		rows[ i / row_size ] = grid.substring( i, i + row_size );
	};
	return rows;
}

function column_split( grid )
{
	var rows = row_split( grid );
	var columns = {};

	for ( var i = 0; i < column_size; i++ )
	{

		columns[ i ] = "";

		for ( var j = 0; j < row_size; j++ )
		{
			columns[ i ] = columns[ i ].toString() + rows[ i ].charAt( j );
		};
	};

	return columns;
}

function box_split( grid )
{
	var boxes = {};

	for ( var i = 0; i < 9; i++ )
	{
		boxes[ i ] = "";
	};

	var position = 0;

	for ( var i = 0; i < box_rows; i++ )
	{
		for ( var j = 0; j < box_columns; j++ )
		{
			for ( var k = 0; k < box_height; k++ )
			{
				boxes[ ( i * box_height ) + k ] += grid.substring( position, position + box_width );
				position += box_width;
			};

		};
	};

	return boxes;
}

function valid_group( group )
{
	for ( var i = 0; i < group.length; i++ )
	{
		if ( group.indexOf( ( i + 1 ).toString() ) == -1 ) return false;
	};

	return true;
}

function valid_rows( grid )
{
	var rows = row_split( grid );

	for ( var i = 0; i < Object.keys( rows ).length; i++ )
	{
		if ( !valid_group( rows[ i ] ) ) return false;
	};

	return true;

}

function valid_columns( grid )
{
	var columns = column_split( grid );

	for ( var i = 0; i < Object.keys( columns ).length; i++ )
	{
		if ( !valid_group( columns[ i ] ) ) return false;
	};

	return true;
}

function valid_boxes( grid )
{
	var boxes = box_split( grid );

	for ( var i = 0; i < Object.keys( boxes ).length; i++ )
	{
		if ( !valid_group( boxes[ i ] ) ) return false;
	};

	return true;
}