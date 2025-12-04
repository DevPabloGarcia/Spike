package com.pablo.dev.spike

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pablo.dev.spike.ui.theme.SpikeTheme
import com.telefonica.expolibrary.ExpoActivityA
import com.telefonica.expolibrary.ExpoActivityB
import kotlin.jvm.java

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SpikeTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MainScreen(
                        onAndroidClick = {
                            val intent = Intent(this, ComposeActivity::class.java)
                            startActivity(intent)
                        },
                        onExpoClick = {
                            val intent = Intent(this, ExpoActivityA::class.java)
                            startActivity(intent)
                        },
                        onExpoSecondaryClick = {
                            val intent = Intent(this, ExpoActivityB::class.java)
                            startActivity(intent)
                        },
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun MainScreen(
    onAndroidClick: () -> Unit,
    onExpoClick: () -> Unit,
    onExpoSecondaryClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Main",
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Button(
            onClick = onAndroidClick,
            modifier = Modifier.padding(8.dp)
        ) {
            Text("Ir a Android")
        }

        Button(
            onClick = onExpoClick,
            modifier = Modifier.padding(8.dp)
        ) {
            Text("Ir a Component 1")
        }

        Button(
            onClick = onExpoSecondaryClick,
            modifier = Modifier.padding(8.dp)
        ) {
            Text("Ir a Component 2")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    SpikeTheme {
        MainScreen(
            onAndroidClick = {},
            onExpoClick = {},
            onExpoSecondaryClick = {},
        )
    }
}